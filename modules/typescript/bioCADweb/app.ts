/// <reference path="../../build/linq.d.ts" />

/// <reference path="./WebApp/LogInScript.ts" />

Router.AddAppHandler(new bioCAD.WebApp.LogInScript(), "passport");
Router.AddAppHandler(new bioCAD.WebApp.RegisterScript(), "passport");
Router.AddAppHandler(new bioCAD.WebApp.RecoverScript(), "passport");

$ts.FrameworkDebug = true;
$ts(() => Router.RunApp($ts.windowLocation().fileName));