<?php

/**
 * The data repository system of biocad.cloud platform
*/
class DataRepository {

    /**
     * @var Table
    */
    public $data_files;

    /**
     * @var DataRepository
    */
    private static $repo;

    function __construct() {
        $this->user = new Table("data_files");
    }

    /**
     * 
     * 
     * @return returns the file id
    */
    public function addFile($name, $file, $info = "") {
        return $this->data_files->add([
            "user_id" => System::getUserId(),
            "name" => $name,
            "suffix" => end(explode(".", $name)),
            "content_type" => 1,
            "uri" => $file,
            "size" => filesize($file),
            "upload_time" => Utils::Now(),
            "md5" => md5_file($file),
            "description" => $info
        ]);
    }

    public static function getLastMySql() {
        return self::getRepo()->data_files->getLastMySql();
    }

    /**
     * @return DataRepository
    */
    public static function getRepo() {
        if (Utils::isDbNull(self::$repo)) {
            self::$repo = new DataRepository();
        }
breakpoint("create data repo");
        return self::$repo;
    }

    /**
     * Check user has the acess right to the target file
     * 
     * @param $id the file id
     * 
     * @return boolean
    */
    public static function checkUserAccess($id) {
        if (Utils::isDbNull($id) || $id <= 0) {
            return true;
        } 

        $repo = self::getRepo();
        $file = $repo->data_files->where(["id" => $id])->find();

        if (Utils::isDbNull($file)) {
            return false;
        } else {
            return $file["user_id"] == System::getUserId();
        }
    }
}