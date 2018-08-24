<?php

include "../bootstrap.php";

/**
 * 网站用户API模块
*/
class user {

	const CredentialVerifyError = "User not found or invalid credential information provided!";

    /**
     * 用户登录验证
     * 
     * @access *
     * @uses api
    */ 
    public function login() {

        // {account/email, password_md5}
        $credential = $_POST;
        $account    = $credential["account"];
        $assert     = "";

        if (Strings::InStr($account, "@") > 0) {
            # 是电子邮件来的？
            $assert = "lower(`email`)   = lower('$account')";
        } else {
            $assert = "lower(`account`) = lower('$account')";
        }

        // account或者account都应该是唯一的，所以在这里查找出来的用户信息也应该是唯一的
        $user = (new Table("user"))->where($assert)->find();

        if (!$user || $user["password"] != $credential["password"]) {

            # 没有找到对应的记录
            echo dotnet::errorMsg(self::CredentialVerifyError);
            die;
        
        } else if ($user["status"] == 0) {
            echo dotnet::errorMsg("User not actived yet!");
            die;
        } else if ($user["status"] == 403) {
            echo dotnet::errorMsg("User banned!");
            die;
        } else {

            // 向session之中写入用户的记录信息，然后返回成功消息
            $_SESSION["user"]     = $user;
            $_SESSION["settings"] = self::GetUserSettings($user["id"]);

            echo dotnet::successMsg("success");

        }
    }

    /**
     * 从数据库之中读取用户的配置数据信息 
    */ 
    private static function GetUserSettings($user_id) {
        $configs = new Table("user_settings");
        $settings = $configs->where(["user_id" => $user_id])->find();

        if (!$settings) {

            # 没有从数据库之中找到对应的配置信息？？？
            # 则加载默认的用户配置信息数据，然后保存到数据库之中
            $settings = include "../etc/default_user_settings.php";
            $settings["user_id"] = $user_id;

            $configs->add($settings);
        }

        return $settings;
    }
    
    /**
     * User register api
     * 
     * @access *
     * @uses api
    */
    public function register() {
        $id = (new Table("user"))->add([
            "account"     => $_POST["username"],
            "email"       => $_POST["email"], 
            "password"    => $_POST["password"],
            "role"        => 0,
            "status"      => 0,
            "create_time" => Utils::Now()
        ]);

        if (!empty($id) && $id !== false) {
            echo dotnet::successMsg("add=$id!");
        } else {
            echo dotnet::errorMsg("Not working!");
        }        
    }

    /**
     * User modify password
     * 
     * 
    */
    public function modifyPassword() {
        $user     = $_SESSION["password"];
        $password = $_POST["password"];

        if (!$user || $user["password"] != $password) {
            echo dotnet::errorMsg(self::CredentialVerifyError);
            die;
        } else {
            # 发送电子邮件
            $email = $user["email"];
        }
    }

    // 允许用户进行匿名登陆，使用cookie来记录session的编号而获取服务器的计算资源
    // 在这个函数之中为用户初始化后台的session的数据记录信息
    public function anonymous_login() {

    }

    /**
     * logout
     * 
     * 清除session信息之后对用户进行重定向至首页
     * 
     * @access *
     * @uses api
    */
    public function logout() {    
        $_SESSION["user"]     = NULL;
        $_SESSION["settings"] = NULL;

        unset($_SESSION);
        session_destroy();

        Redirect("/");        
    }

    /**
     * @access *
     * @uses api
    */
    public function dataprotection() {
        $_SESSION["dismiss_banner"] = "true";
        echo dotnet::successMsg("dismiss");
    }
}
?>