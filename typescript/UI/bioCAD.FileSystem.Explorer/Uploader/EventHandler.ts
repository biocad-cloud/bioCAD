class EventHandler {

    /**
     * 请求完成
    */
    public UploadComplete: (this: XMLHttpRequest, event: Event) => any;

    /**
     * 请求失败
    */
    public UploadFailed: (this: XMLHttpRequest, event: ErrorEvent) => any;

    /**
     * 【上传进度调用方法实现】
    */
    public ProgressFunction: (this: XMLHttpRequest, event: ProgressEvent) => any;

    /**
     * 上传开始的时间
    */
    public ot: number;
    /**
     * 已经上传的文件大小
    */
    public oloaded: number;

    public onLoadStart(): void {
        // 设置上传开始时间
        this.ot = new Date().getTime();
        // 设置上传开始时，已经上传的文件大小为0
        this.oloaded = 0;
    }
}