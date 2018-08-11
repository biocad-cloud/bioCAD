module Uploader {

    var droppedFiles: FileList;
    var isAdvancedUpload: boolean = Browser.isAdvancedUpload();

    export function hasDroppedFiles(): boolean {
        return !(droppedFiles == null || droppedFiles == undefined || droppedFiles.length == 0);
    }

    /**
     * Applying the effect for every form
    */
    export function Register(): void {
        document.querySelectorAll('.box').forEach(registerImpl);
    }

    function getTitleUpdate(input: Element, files: FileList): string {
        var n: number = files.length;

        if (n > 1) {
            var caption: string = input.getAttribute('data-multiple-caption') || '';
            return caption.replace('{count}', n.toString());
        } else {
            return files[0].name;
        }
    }

    /**
     * Letting the server side to know we are going to make an Ajax request
    */
    function getAjaxFlag(): HTMLInputElement {
        var ajaxFlag: HTMLInputElement = document.createElement('input');
        ajaxFlag.setAttribute('type', 'hidden');
        ajaxFlag.setAttribute('name', 'ajax');
        ajaxFlag.setAttribute('value', '1');

        return ajaxFlag;
    }

    function registerImpl(form: Element) {
        var input: HTMLInputElement = form.querySelector('input[type="file"]'),
            label = form.querySelector('label'),
            errorMsg = form.querySelector('.box__error span'),
            restart = form.querySelectorAll('.box__restart'),
            showFiles = function (files: FileList) {
                label.textContent = getTitleUpdate(input, files);
            },
            triggerFormSubmit = function () {
                var event: Event = document.createEvent('HTMLEvents');
                event.initEvent('submit', true, false);
                form.dispatchEvent(event);
            };

        form.appendChild(getAjaxFlag());

        // automatically submit the form on file select
        input.addEventListener('change', () => {
            showFiles(input.files);
        });

        // drag&drop files if the feature is available
        if (isAdvancedUpload) {
            setupAdvancedUpload(form, showFiles);
        }

        // Firefox focus bug fix for file input
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    }

    /**
     * drag&drop files if the feature is available
    */
    function setupAdvancedUpload(form: Element, showFiles: (files: FileList) => void) {
        // letting the CSS part to know drag&drop is supported by the browser
        form.classList.add('has-advanced-upload');

        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
            form.addEventListener(event, function (e) {
                // preventing the unwanted behaviours
                e.preventDefault();
                e.stopPropagation();
            });
        });
        ['dragover', 'dragenter'].forEach(function (event) {
            form.addEventListener(event, function () {
                form.classList.add('is-dragover');
            });
        });
        ['dragleave', 'dragend', 'drop'].forEach(function (event) {
            form.addEventListener(event, function () {
                form.classList.remove('is-dragover');
            });
        });

        // the files that were dropped
        form.addEventListener('drop', function (e: DragEvent) {
            droppedFiles = e.dataTransfer.files;
            showFiles(droppedFiles);
        });
    }
}

module Browser {

    /**
     * Feature detection for drag&drop upload
    */
    export function isAdvancedUpload(): boolean {
        var div: HTMLDivElement = document.createElement('div');
        var draggable = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
        var test: boolean = draggable && 'FormData' in window && 'FileReader' in window;

        return test;
    }
}