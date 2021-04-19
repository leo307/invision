/* UI Var */
var UImisc = "[Invision] Misc";
var UIaa = "[Invision] Anti-Aim";
var UIrage = "[Invision] Rage";

/* UI */
UI.AddSubTab(["Misc.", "SUBTAB_MGR"], UImisc);
UI.AddSubTab(["Misc.", "SUBTAB_MGR"], UIrage);
UI.AddSubTab(["Misc.", "SUBTAB_MGR"], UIaa);
/* Misc */
UI.AddCheckbox(["Misc.", UImisc, UImisc], "Misc Enabled");
UI.SetValue(["Misc.", UImisc, UImisc, "Misc Enabled"], 1);
UI.AddCheckbox(["Misc.", UImisc, UImisc], "Watermark");
UI.AddSliderInt(["Misc.", UImisc, UImisc], "[Watermark] X", 0, 2000);
UI.AddSliderInt(["Misc.", UImisc, UImisc], "[Watermark] Y", 0, 2000);
UI.SetValue(["Misc.", UImisc, UImisc, "[Watermark] X"], 1660);
UI.SetValue(["Misc.", UImisc, UImisc, "[Watermark] Y"], 10);
UI.AddCheckbox(["Misc.", UImisc, UImisc], "Indicators");
UI.AddColorPicker(["Misc.", UImisc, UImisc,], "[Indicators] Indicator Colors");
UI.AddCheckbox(["Misc.", UImisc, UImisc], "Clantag");
//UI.AddSliderInt(["Misc.", UImisc, UImisc], "[Clantag] Speed", 0, 5);
/* Anti-Aim */
UI.AddCheckbox(["Misc.", UIaa, UIaa], "AA Enabled");
UI.SetValue(["Misc.", UIaa, UIaa, "AA Enabled"], 1);
UI.AddDropdown(["Misc.", UIaa, UIaa], "AA Presets", ["Lowdelta", "Static", "Dangerous"], 0);
UI.AddSliderInt(["Misc.", UIaa, UIaa], "Slowwalk", 1, 100);
/* Rage */
UI.AddCheckbox(["Misc.", UIrage, UIrage], "Rage Enabled");
UI.SetValue(["Misc.", UIrage, UIrage, "Rage Enabled"], 1);
UI.AddCheckbox(["Misc.", UIrage, UIrage], "Advanced Doubletap");
UI.AddHotkey(["Misc.", "Keys", "Key assignment"], "Minimum Damage Visible", "Visible Min DMG");
UI.AddSliderInt(["Misc.", UIrage, UIrage], "Minimum Damage Visible", 1, 100);

/* Utils */{
    get_dpi_scale = function () {
        return Render.GetScreenSize()[1] / 1080 /* everything scaled by base size on a 1080p monitors */;
    }
    function HSVtoRGB(h, s, v){
        var r, g, b, i, f, p, q, t;
    
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
    
        switch (i % 6)
        {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
    
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }
}

/* Draw Global Variables */
var last_clantag = "";
var tag_list = [
    // Label these in order of numbers, if you add more follow the format.
    "I", "In", "Inv", "Invi",
    "Invis", "Invisi", "Invisio", "Invision",
    "Invision ", "Invision", "Invisio", "Invisi",
    "Invis", "Invi", "Inv", "In",
    "I", "",
];

/* Draw */
function fengyidraw(){

    /*  Draw Vars */{
    var wat_enabled = UI.GetValue(["Misc.", UImisc, UImisc, "Watermark"]);
    var wat_x = UI.GetValue(["Misc.", UImisc, UImisc, "[Watermark] X"]);
    var wat_y = UI.GetValue(["Misc.", UImisc, UImisc, "[Watermark] Y"]);
    var font = Render.GetFont("segoeuib.ttf", 12, true);
    var rainbow_clr = HSVtoRGB(Globals.Realtime() / 3 % 1, 1, 1);
    var fps = Math.floor(1 / Globals.Frametime());
    var ind_enabled = UI.GetValue(["Misc.", UImisc, UImisc, "Indicators"]);
    // const ss = Render.GetScreenSize();
    var dpi_scale = get_dpi_scale();
    var wanted_tag = "";
    //var clan_speed = UI.GetValue(["Misc.", UImisc, UImisc, "[Clantag] Speed"]);
    var misc_master = UI.GetValue(["Misc.", UImisc, UImisc, "Misc Enabled"]);
    const ss = Render.GetScreenSize();
    var localPlayer_index = Entity.GetLocalPlayer();
    var localPlayer_eyepos = Entity.GetEyePosition(localPlayer_index);
    var indicolor = UI.GetColor(["Misc.", UImisc, UImisc, "[Indicators] Indicator Colors"]);
    var i = 0;
    var ss = Render.GetScreenSize();
    var x = ss[0] / 2 * dpi_scale;
    var y = ss[1] / 2 + 40 * dpi_scale;
    var enabled = [];
    var dt = UI.GetValue(["Rage", "Exploits", "Keys", "Double tap"]);
    var hs = UI.GetValue(["Rage", "Exploits", "Keys", "Hide shots"]);
    var fd = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Fake duck"]);
    var mindmg = UI.GetValue(["Misc.", "Keys", "Key assignment","Minimum Damage Visible"]);
    var safepoint = UI.GetValue(["Rage", "General", "General", "Key assignment", "Force safe point"]);
    var invert = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]);
}

    /* Misc */
    if (misc_master) {
    if (UI.GetValue(["Misc.", UImisc, UImisc, "Clantag"]))
    wanted_tag = tag_list[Math.floor(Globals.Curtime() * 2) % tag_list.length];
    if (wanted_tag != last_clantag) {
    Local.SetClanTag(wanted_tag);
    last_clantag = wanted_tag;
    }
    if(wat_enabled){
        Render.GradientRect(wat_x, wat_y - 1, 250, 2, 1, [rainbow_clr.r, rainbow_clr.g, rainbow_clr.b, 255], [rainbow_clr.b, rainbow_clr.r, rainbow_clr.g, 255]);
        Render.FilledRect(wat_x, wat_y, 250, 27, [0, 0, 0, 100]);
        Render.String(wat_x + 10, wat_y + 5, 0, "Invision [Beta] | " + Cheat.GetUsername() + " | " + Globals.Tickrate().toString() + " | " + Globals.ChokedCommands().toString() + " | " + fps, [89, 159, 244, 255], font);
    }
    
    if(indicolor){
        Render.GradientRect(920 * dpi_scale, 570 * dpi_scale, 85 * dpi_scale, 2 * dpi_scale, 1, [rainbow_clr.r, rainbow_clr.g, rainbow_clr.b, 255], [rainbow_clr.b, rainbow_clr.r, rainbow_clr.g, 255]);
        //Render.Line(920 * dpi_scale, 570 * dpi_scale, 1000 * dpi_scale, 570 * dpi_scale, [200, 200, 200, 200]);
        //Render.Line(920 * dpi_scale, 569 * dpi_scale, 1000 * dpi_scale, 569 * dpi_scale, [200, 200, 200, 200]);
        Render.String(961 * dpi_scale, 551 * dpi_scale, 1, "Invision", [0, 0, 0, 170], font);
        Render.String(960 * dpi_scale, 550 * dpi_scale, 1, "Invision", [89, 159, 244, 255], font);
        if (dt) {
            enabled[i] = "DT"
            i = i + 1
        }
        if (hs) {
            enabled[i] = "HS"
            i = i + 1
        }
        if (fd) {
            enabled[i] = "FD"
            i = i + 1
        }
        if (safepoint) {
            enabled[i] = "Safepoint"
            i = i + 1
        }
        if (invert) {
            enabled[i] = "Inverter"
            i = i + 1
        }
        if (mindmg) {
            enabled[i] = "DMG Override"
            i = i + 1
        }
            for (b = 0; b < enabled.length; b++){
                Render.String(x + 1, y + 1, 1, enabled[b], [0, 0, 0, 170], font);
                Render.String(x, y, 1, enabled[b], indicolor, font);
                y = y + 13 * dpi_scale;
            }
    }
    }
}

/* Create Move */
function fengyicreatemove(){
    var dt_enabled = UI.GetValue(["Misc.", UIrage, UIrage, "Advanced Doubletap"]);
    var presets = UI.GetValue(["Misc.", UIaa, UIaa, "AA Presets"]);
    var invert = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"], "AA Inverter");
    var min_dmg_visible = UI.GetValue(["Misc.", UIrage, UIrage, "Minimum Damage Visible"]); 
    var enemies = Entity.GetEnemies();
    var aa_master = UI.GetValue(["Misc.", UIaa, UIaa, "AA Enabled"]);
    var rage_master = UI.GetValue(["Misc.", UIrage, UIrage, "Rage Enabled"]);

    /* AA */ 
    if (aa_master) {
    /* AA Presets */
    switch(presets){
        case 0: /* Lowdelta */     {     
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(invert ? 2 : -2);
            AntiAim.SetRealOffset(invert ? -19 : 19);
        } break;
        case 1: /* Static */ {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(invert ? 30 : -30 );
            AntiAim.SetRealOffset(invert ? -25 : 25 );
        } break;
        case 2: /* Dangerous */ {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(invert ? 11 : -11 );
            AntiAim.SetRealOffset(invert ? -34 : 34 );
        } break;
    }

    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Slow walk"]) == 1) {
        var velocity = UI.GetValue(["Misc.", UIaa, UIaa, "Slowwalk"]);
        dir = [0, 0, 0]; 
        if (Input.IsKeyPressed(0x44)) {
            dir[1] += velocity;
        }
        if (Input.IsKeyPressed(0x41)) {
            dir[1] -= velocity;
        }
        if (Input.IsKeyPressed(0x53)) {
            dir[0] -= velocity;
        }
        if (Input.IsKeyPressed(0x57)) {
            dir[0] += velocity;
        }
        UserCMD.SetMovement(dir);
    }
}

    /* Rage */
    if (rage_master) { 
    if(dt_enabled){
        Exploit.OverrideShift(16);
        Exploit.OverrideTolerance(0)
    }
    if (!UI.GetValue(["Misc.", "Keys", "Key assignment", "Minimum Damage Visible"]))
        return;
    enemies.forEach(function (enemy) {
        if (Entity.IsAlive (enemy) && !Entity.IsDormant (enemy)) {
            Ragebot.ForceTargetMinimumDamage (enemy, min_dmg_visible);
        }
    })

}
}

/* Callbacks */
Cheat.RegisterCallback("Draw", "fengyidraw");
Cheat.RegisterCallback("CreateMove", "fengyicreatemove");