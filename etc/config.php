<?php

// 网站的配置数据
return [
    'DB_TYPE' => 'mysql',
    'DB_HOST' => '127.0.0.1',
    'DB_NAME' => 'biocad',
    'DB_USER' => 'bioCAD',
    'DB_PWD' => 'biocad.cloud',
    'DB_PORT' => '3306',
    // 'DB_PREFIX' => 'xcms_',
    //密钥
    "AUTHCODE" => 'A2f0qS78ttR9HpqeOT',
    //cookies
    "COOKIE_PREFIX" => '8FSUix_',
    "ERR_HANDLER_DISABLE" => "FALSE",

    // 自定义http错误页面的位置，例如404 500 403等
    "RFC7231" => "html/http_errors",
    "CACHE"   => true,
    "APP_NAME" => "bioCAD",
	"APP_VERSION" => "0.222.58-alpha",
    "MVC_VIEW_ROOT" => [
        "passport" => "./html/user/",
        "app" => "./html/Application/"
    ]
];
