/// <reference path="../../build/linq.d.ts" />

/// <reference path="./WebApp/LogInScript.ts" />

Router.AddAppHandler(new bioCAD.WebApp.LogInScript(), "passport");

$ts(() => Router.RunApp($ts.windowLocation().fileName));