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
    public ProgressFunction(xhr: XMLHttpRequest, evt: ProgressEvent): void {
        var progressBar = document.getElementById("progressBar");
        var percentage: number = 0;

        // event.total是需要传输的总字节，event.loaded是已经传输的字节。
        // 如果event.lengthComputable不为真，则event.total等于0
        if (evt.lengthComputable) {
            progressBar.max = evt.total;
            progressBar.value = evt.loaded;

            percentage = Math.round(evt.loaded / evt.total * 100);
        }

        var nt = new Date().getTime(); // 获取当前时间
        var pertime = (nt - this.ot) / 1000;     // 计算出上次调用该方法时到现在的时间差，单位为s
        this.ot = new Date().getTime(); // 重新赋值时间，用于下次计算

        var perload = evt.loaded - this.oloaded; // 计算该分段上传的文件大小，单位b       
        this.oloaded = evt.loaded;           // 重新赋值已上传文件大小，用以下次计算

        // 上传速度计算
        var speed: number = perload / pertime;
        var bspeed = speed;
        var units = 'b/s';

        if (speed / 1024 > 1) {
            speed = speed / 1024;
            units = 'k/s';
        }
        if (speed / 1024 > 1) {
            speed = speed / 1024;
            units = 'M/s';
        }

        // 剩余时间
        var rest_time = ((evt.total - evt.loaded) / bspeed).toFixed(1);
        progressBar.innerHTML = `${percentage}% (${speed.toFixed(1)}${units}, ETA: ${rest_time}s)`;

        $('#controlButton').progressSet(percentage);
    };

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