$(document).ready(function(){
    // aktuális idő beállítása
    var tdate = new Date();
    var year = tdate.getFullYear();
    $("footer #now").text(year);

    // Mobil nézetben a navigáció megjelenítése
    var displayNavigation = function a(icon = ".hamburger-menu") {
        $(icon).toggleClass("open");
        $("nav").slideToggle("medium", function() {
            if ($(icon).is(":visible")) {
                $(icon).css("display","block");
                $("body").css("overflow","hidden");
            }
            else {
                $("body").css("overflow","auto");
            }
        });
    }
    $(".hamburger-menu").click(function(){
        displayNavigation();
    });
    $(".nav-link").click(function(){
        if (window.matchMedia("(max-width: 768px)").matches)
            displayNavigation();
    });

    // Megfelelő tartalom megjelenítése
    var id = "";
    var get_data = function get_data() {
        $.ajax({
            dataType: "JSON", 
            url: "assets/json/data.json",
            success: function(data) {
                data.forEach(e => {
                    if (e.id == id) {
                        $("main .category-title h1").text(e.nev);
                        $("main .category-title .category-img").attr("src", e.kep);
                        $("main .category-title .category-img").attr("alt", e.nev);
                        $("main p").text(e.leiras);
                        $("footer #category-name").text("\xa0| " + e.nev);
                        $("#description").attr("content", e.nev);
                        window.history.pushState("", "", "?kategoria="+e.id);
                    }
                });
            }
        });
    }
    if (((location.search.split(name + "=")[0] == "?kategoria" && location.search.split(name + "=")[1]) || "").split("&")[0]) {
        id = (location.search.split(name + "=")[1] || "").split("&")[0];
        get_data();
    } 
    $(".nav-link").click(function() {
        id = $(this).attr("id");
        get_data();
   });
});