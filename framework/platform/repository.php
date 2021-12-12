<?php

define("MODEL_FILE_ACCESS_ERROR", "Sorry, the required model file is not existed in data repository or it does not under control in current user domain!");

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
        $this->data_files = new Table("data_files");
    }

    public static function getModelFile($id) {
        return self::getRepo()->data_files
            ->where([
                "id" => $id,
                "user_id" => System::getUserId()
            ])
            ->find();
    }

    /**
     * 
     * 
     * @return returns the file id
    */
    public function addFile($name, $file, $info = "") {
        $suffix = end(explode(".", $name));

        return $this->data_files->add([
            "user_id" => System::getUserId(),
            "name" => $name,
            "suffix" => $suffix,
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