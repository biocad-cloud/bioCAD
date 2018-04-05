<?php

# Module file for handling biostack data analysis API
include "./mod/dotnet/package.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new api());
// dotnet::printMySqlTransaction();
// dotnet::writeMySqlLogs(TRUE);

class api {

    const OSS        = "bioCAD_OSS";
    const OSSDefault = "D:/temp/";

    public function upload() {
        
        $file      = $_FILES["files"];
        $projID    = $_GET["project"];
        $workspace = (new Table("project"))->where(array("id" => $projID))->findfield("workspace");
        $workspace = "/$workspace/raw/";
        $user_id   = $_SESSION["user"]["id"];        
        
        # DATA/$workspace/{fileName}      
        $file_name  = $file["name"][0];
        $source     = $file["tmp_name"][0];	
        $directory  = DotNetRegistry::Read(api::OSS, api::OSSDefault) . $workspace;
        $uniqueName = Utils::RandomASCIIString(16);
        $suffix     = Utils::GetExtensionSuffix($file_name);
        $path       = "$directory/$uniqueName.dat";        
						
        if (strlen($file_name) == 0) {
            echo dotnet::errorMsg("FileName empty!");
            die;
        }

        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }
        if (file_exists($path)) {
            unlink($path);
        }

        move_uploaded_file($source, $path);

        if (!file_exists($path)) {
            echo dotnet::errorMsg("filesystem write permission denied!");
        } else {

            $uri = "$workspace/$uniqueName.dat"; 
            $uri = Strings::Replace($uri, "//", "/");

            # 文件上传成功了
            # 同时还需要添加数据库记录            
            $file = array(
                "user_id"     => $user_id, 
                "name"        => $file_name, 
                "upload_time" => Utils::Now(), 
                "size"        => filesize($path), 
                "md5"         => md5_file($path),
                "uri"         => $uri,
                "suffix"      => $suffix
            );
            
            $file_id   = (new Table("data_files"))->add($file);
            $associate = array(
                "user_id"    => $user_id, 
                "project_id" => $projID, 
                "file_id"    => $file_id, 
                "join_time"  => Utils::Now()
            ); 

            (new Table("project_files"))->add($associate);

            echo dotnet::successMsg("success!");
        }
    }
}

?>