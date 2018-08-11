<?php

session_start();

# Module file for handling biostack data analysis API
include "../modules/dotnet/package.php";

Imports("Microsoft.VisualBasic.Strings");

dotnet::AutoLoad("../etc/config.php");
dotnet::HandleRequest(new user());

class user {

	const CredentialVerifyError = "User not found or invalid credential information provided!";

    // 用户登录验证
    public function login() {

        // {account/email, password_md5}
        $credential = $_POST;
        $account = $credential["account"];
        $assert = "";

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

        } else {

            // 向session之中写入用户的记录信息，然后返回成功消息
            // 从数据库之中读取用户的配置数据信息
            $configs = new Table("user_settings");
            $settings = $configs->where(array("user_id" => $user["id"]))->find();

            if (!$settings) {

                # 没有从数据库之中找到对应的配置信息？？？
                # 则加载默认的用户配置信息数据，然后保存到数据库之中
                $settings = include "../etc/default_user_settings.php";
                $settings["user_id"] = $user["id"];

                $configs->add($settings);

            }

            $_SESSION["user"]     = $user;
            $_SESSION["settings"] = $settings;

            echo dotnet::successMsg("success");

        }
    }

    public function register() {
        $id = (new Table("user"))->add([
            "account"  => $_POST["username"],
            "email"    => $_POST["email"], 
            "password" => $_POST["password"]
        ]);

        if (!empty($id) && $id !== false) {
            echo dotnet::successMsg("add=$id!");
        } else {
            echo dotnet::errorMsg("Not working!");
        }        
    }

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

    public function logout() {

        // 清除session信息之后对用户进行重定向至首页
        $_SESSION["user"] = NULL;
        $_SESSION["settings"] = NULL;

        unset($_SESSION);
        session_destroy();

        Redirect("/");        
    }

    public function dataprotection() {
        $_SESSION["dismiss_banner"] = "true";
        echo dotnet::successMsg("dismiss");
    }
}
?>