<?php
/**
 * Created by PhpStorm.
 * User: hackathon
 * Date: 11/11/2015
 * Time: 9:40 PM
 */
function autoload_class_multiple_directory($class_name)
{

    # List all the class directories in the array.
    $array_paths = array(
        ROOT.'/rghack2015/app/models',
        ROOT.'/rghack2015/app/services'
    );

    foreach($array_paths as $path)
    {
        $file = $path.'/'.$class_name.'.php';
        if(is_file($file))
        {
            include $file;
        }
    }
}
spl_autoload_register('autoload_class_multiple_directory');