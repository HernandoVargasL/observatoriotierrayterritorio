var map;
var view;
var esri;

var homeBtn;
var overviewMap;
var scalebar;
var legend;
var basemap_gallery;
var printer;
var default_extent;
var homeBtn;
var locateBtn;
var resizeCenter;
var loading;

var swipeWidget;
var swipeLayer2;
var swipeLayer1;
var swipeLayer;
var cacheMosaicos;
var previewLayer;
var coordsLayer;
var pointMarker;

var popup;
var hoverHandle;
var updateHandle;
var slider;

var defaultAlertTimer = 3000;

var currentUser;
var currentAccessToken;
var firebase_ui;
var currentBasemap;
var currentScreen;
var currentEstado = "init";
var currentSearch = "all";
var firstExpand = true;
var firstParameters = true;
var firstSearch = true;
var coberturaRow = null;

var currentMode = "media";

var cacheUnidadesFiltro = [];
var activeLayers = [];
var currentServicio;

var areaLayer;
var geojsonLayer;
var modoSearch = "entidad";
var drawTool;
var editTool;
var drawTool2;
var editTool2;
var activeTool;

var configProperties = [
    { "property": "visible_confidence_percent", "label": "Porcentaje de confianzavisible", "visible": "FALSE", "tooltip": "Los valores visibles representan la fracción del contenido de la escena (excluyendo la parte de la imagen que contiene relleno negro) que comprende las categorías de claridad, neblina ligera, sombra, nieve/hielo, y se dan como un porcentaje que varía de cero a cien." },
    { "property": "satellite_id", "label": "Id satélite", "visible": "TRUE", "tooltip": "Identificador de satélite único a nivel mundial." },
    { "property": "item_type", "label": "Tipo de artículo", "visible": "FALSE", "tooltip": "Nombre del tipo de elemento." },
    { "property": "instrument", "label": "Instrumento", "visible": "FALSE", "tooltip": "Nombre del instrumento satelital utilizado para recolectar la imagen." },
    { "property": "visible_percent", "label": "Porcentaje visible", "visible": "FALSE", "tooltip": "Promedio del porcentaje de confianza para clear_percent, light_haze_percent, shadow_percent y snow_ice_percent." },
    { "property": "snow_ice_percent", "label": "Porcentaje nieve ice", "visible": "FALSE", "tooltip": "Porcentaje de valores de nieve y hielo en el conjunto de datos. Los valores de Snow_ice representan áreas de contenido de escena (no rellenas en negro) que están ocultas debajo de la nieve o el hielo." },
    { "property": "cloud_percent", "label": "Porcentaje de nubosidad", "visible": "TRUE", "tooltip": "Porcentaje de valores de nubes en el conjunto de datos. Los valores de nubes representan áreas de contenido de escena (no rellenas en negro) que contienen nubes opacas que impiden una interpretación confiable del contenido de la cobertura terrestre." },
    { "property": "sun_azimuth", "label": "Azimut al sol", "visible": "TRUE", "tooltip": "El ángulo del sol, visto por el observador, medido en el sentido de las agujas del reloj desde el norte (0 - 360)." },
    { "property": "provider", "label": "Proveedor", "visible": "TRUE", "tooltip": "Nombre del proveedor del artículo (p. ej. 'planetscope', 'rapideye')." },
    { "property": "ground_control", "label": "Control de tierra", "visible": "FALSE", "tooltip": "Precisión posicional del artículo. Si el elemento tiene una precisión posicional incierta, este valor es falso." },
    { "property": "view_angle", "label": "Ángulo de visión", "visible": "TRUE", "tooltip": "El ángulo de visión del satélite respecto al nadir y a lo largo de su trayectoria. Los números positivos indican el este, los números negativos indican el oeste (-25 - +25)." },
    { "property": "cloud_cover", "label": "Cubrimiento de nubes", "visible": "FALSE", "tooltip": "Relación entre el área cubierta por nubes y la descubierta." },
    { "property": "strip_id", "label": "Strip id", "visible": "FALSE", "tooltip": "El identificador único de la franja de imagen de donde proviene el artículo." },
    { "property": "acquired", "label": "Adquirido", "visible": "FALSE", "tooltip": "Marca de tiempo en la que se capturó el elemento." },
    { "property": "publishing_stage", "label": "Etapa_publicación", "visible": "FALSE", "tooltip": "Etapa de publicación de un artículo. PSEscenaprimera publicaciónpuede ser a cualquier estado;avance,estándarofinalizado. El estado de menor calidad esavance. Cuando una imagen pasa por la rectificación, pasa aestándary, en definitiva, a lafinalizadoestado.Nota: algunas imágenes permanecen enavanceestado y no pasan por el refinamiento RPC." },
    { "property": "sun_elevation", "label": "Elevación sol", "visible": "TRUE", "tooltip": "El ángulo del sol sobre el horizonte (0 - 90)." },
    { "property": "light_haze_percent", "label": "Porcentaje de neblina y luz", "visible": "FALSE", "tooltip": "Porcentaje de valores de neblina de luz en el conjunto de datos. Los valores de neblina ligera representan áreas de contenido de escena (no rellenas en negro) que contienen nubes delgadas de baja altitud, cirros de mayor altitud y hollín y polvo que permiten un reconocimiento confiable de las características de la cobertura del suelo y que tienen hasta +/-10 % de incertidumbre. en índices comúnmente utilizados (EVI y NDWI)." },
    { "property": "shadow_percent", "label": "Porcentaje de sombras", "visible": "TRUE", "tooltip": "Porcentaje de valores sombra en el conjunto de datos. Los valores de sombra representan áreas de contenido de la escena (no cubiertas en negro) que no están completamente expuestas a la iluminación solar como resultado de pérdidas de transmisión atmosférica debido a nubes, neblina, hollín y polvo y, por lo tanto, no permiten una interpretación confiable de la radiometría o la reflectancia de la superficie. ." },
    { "property": "quality_category", "label": "Categoría_calidad", "visible": "FALSE", "tooltip": "Métrica de calidad de imagen del planeta:estándaroprueba. Para calificar paraestándarCalidad de imagen Una imagen debe cumplir una variedad de estándares de calidad, por ejemplo: alineación de bandas o número mínimo de píxeles faltantes. Si la imagen no cumple con estos criterios se considerapruebacalidad." },
    { "property": "published", "label": "Publicado", "visible": "FALSE", "tooltip": "Marca de tiempo en la que se publicó el elemento en la API de Planet." },
    { "property": "satellite_azimuth", "label": "Azimut satélite", "visible": "TRUE", "tooltip": "Dirección de orientación de la nave espacial desviada, en grados (0-360)." },
    { "property": "heavy_haze_percent", "label": "Porcentaje de niebla pesada", "visible": "FALSE", "tooltip": "Porcentaje de valores de turbidez intensa en el conjunto de datos. Los valores de neblina intensa representan áreas de contenido de escena (no rellenas en negro) que contienen nubes delgadas de baja altitud, cirros de mayor altitud, hollín y polvo que permiten un reconocimiento justo de las características de la cobertura terrestre, pero que no tienen una interpretación confiable de la radiometría o la reflectancia de la superficie." },
    { "property": "pixel_resolution", "label": "Resolución espacial", "visible": "TRUE", "tooltip": "Resolución de píxeles de las imágenes en metros." },
    { "property": "clear_percent", "label": "Porcentaje de valores claros", "visible": "FALSE", "tooltip": "Porcentaje de valores claros en el conjunto de datos. Los valores claros representan áreas de contenido de la escena (no rellenas en negro) que se considera que no se ven afectadas por nubes, neblina, sombra o nieve." },
    { "property": "anomalous_pixels", "label": "Píxeles_anómalos", "visible": "FALSE", "tooltip": "Porcentaje de píxeles que pueden tener errores. Representado espacialmente en la UDM." },
    { "property": "clear_confidence_percent", "label": "Valor porcental de claridad", "visible": "FALSE", "tooltip": "Valor porcentual: confianza algorítmica por píxel en una clasificación 'clara'." },
    { "property": "gsd", "label": "GSD", "visible": "TRUE", "tooltip": "Distancia de muestra del suelo: la distancia entre los centros de los píxeles medida en el suelo en metros." },
    { "property": "updated", "label": "Actualizado", "visible": "FALSE", "tooltip": "Marca de tiempo de la última actualización del registro del artículo." }
];

var configPropertiesAlta = [
    { "property": "Nom_Depto", "label": "Departamento", "visible": "FALSE", "tooltip": "" },
    { "property": "Fecha_Toma", "label": "Fecha", "visible": "FALSE", "tooltip": "" },
    { "property": "Sensor", "label": "Sensor", "visible": "TRUE", "tooltip": "" },
    { "property": "GSD", "label": "GSD", "visible": "TRUE", "tooltip": "" },
    { "property": "Nubosidad", "label": "Nubosidad", "visible": "TRUE", "tooltip": "" },
    { "property": "Ang_Incidencia", "label": "Ángulo de incidencia", "visible": "TRUE", "tooltip": "" },
    { "property": "Res_Radiome", "label": "Resolución Radiometrica", "visible": "TRUE", "tooltip": "" },
    { "property": "Satelite", "label": "Satelite", "visible": "TRUE", "tooltip": "" },
    { "property": "Bandas", "label": "Bandas", "visible": "TRUE", "tooltip": "" },
    { "property": "Zona", "label": "Zona", "visible": "FALSE", "tooltip": "" },
    { "property": "Area_Imagen", "label": "Area_Imagen", "visible": "FALSE", "tooltip": "" },
    { "property": "Nom_CPobla", "label": "Nom_CPobla", "visible": "FALSE", "tooltip": "" },
    { "property": "Cod_Depto", "label": "Cod_Depto", "visible": "FALSE", "tooltip": "" },            
    { "property": "Cod_Muni", "label": "Cod_Muni", "visible": "FALSE", "tooltip": "" },
    { "property": "Nivel_Procesamiento", "label": "Nivel_Procesamiento", "visible": "FALSE", "tooltip": "" },
    { "property": "Nom_Munici", "label": "Nom_Munici", "visible": "FALSE", "tooltip": "" },    
    { "property": "Porcentaje_Cubrimiento", "label": "Porcentaje_Cubrimiento", "visible": "FALSE", "tooltip": "" }    
];

var print_service = "https://mapas.igac.gov.co/server/rest/services/otros/serviciodeimpresion/GPServer/Export%20Web%20Map";

//var web_service = "http://localhost:8080/Geovisor_IGAC";
var web_service = "https://serviciosgeovisor.igac.gov.co:8080/Geovisor";
//var web_service = "http://172.19.3.37:8080/Geovisor";
var web_service_proxy = "https://serviciosgeovisor.igac.gov.co:8080/Geovisor";

var tableSearchBni;
var tableSearchBni2;

var searchCurrent = null;
var cacheUnidades = [];
var cacheEntidades = [];
var cachePermisos = [];

var searchImageLayer;
var searchImageLayerDetalle;
var searchImageSwipeDetalle;

var currentImagenInicial;
var extentInicial;

var searchImagenSymbol;
var searchImagenActiveSymbol;
var searchCoberturaSymbol;

var currentImagen;
var dibujoLayer;

var currentSlide;
var videoSlide;
var canvasVideo;
var ctxVideo;
var mediaRecorder;
var chunks;
var cVideoFrame;
var cX;
var cY;
var cXmin;
var cXmax;
var cYmin;
var cYmax;
var cSizeX;
var cSizeY;
var videoLogo1;
var videoLogo2;


$(document).ready(function () {
    initMap();
    $("[data-toggle='popover']").popover();
    toggleMenu(currentEstado);
    var config = {
        apiKey: "AIzaSyCLSp_Qbaohj8owxrpZxvrmxUSkVw0ukig",
        authDomain: "geovisor-igac.firebaseapp.com"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user;
            $("#loginContainer").hide();
            $("#logoutContainer").show();
            $("#userName,#userName2").html(user.displayName);
            if (user.photoURL != null) {
                if (user.photoURL != "") {
                    $("#userPhoto,#userPhoto2").attr("src", user.photoURL);
                } else {
                    $("#userPhoto,#userPhoto2").attr("src", "/images/iconos/User.png");
                }
            } else {
                $("#userPhoto,#userPhoto2").attr("src", "/images/iconos/User.png");
            }
            currentUser.getIdToken().then(function (accessToken) {
                currentAccessToken = accessToken;
                $.ajax({
                    url: web_service + "/validate2?token=" + currentAccessToken + "&t=" + (new Date()).getTime(),
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.status) {
                            var first = "";
                            cachePermisos = data.permisos;
                            if (cachePermisos.indexOf("IMAGENES_PLANET") != -1) {


                                $(".calcite-map").show();

                                var params = "";
                                $.ajax({
                                    url: web_service + "/config?cmd=config_imagenes&t=" + (new Date()).getTime() + params,
                                    type: 'POST',
                                    success: function (data) {
                                        if (data.status) {
                                            initData(data);
                                        }
                                    },
                                    timeout: 20000,
                                    error: function (err) {
                                        console.error(err);
                                    }
                                });
                            } else {
                                
                            }

                        } else {
                            $("#modalLicencia").modal({ backdrop: 'static', keyboard: false }, "show");
                        }
                    },
                    error: function (xhr, status, error) {
                        $.confirm({
                            title: "Observatorio de la tierra y el territorio",
                            content: "No se pudo validar si el usuario tiene permisos para esta funcionalidad, por favor, intente nuevamente",
                            buttons: {
                                Ok: function () {
                                    window.location.href = "/";
                                }
                            }
                        });
                    }
                });
            });
        } else {
            currentUser = null;
            currentFuncionalidades = [];
            $("#logoutContainer").hide();
            $("#loginContainer").show();
            $("#userName,#userName2").html("Iniciar sesion");
            $("#userPhoto,#userPhoto2").attr("src", "/images/iconos/User.png");
            gotoLogin();
        }
    }, function (error) {
        console.log(error);
    });
    firebase_ui = new firebaseui.auth.AuthUI(firebase.auth());
    $('[data-toggle="tooltip"]').tooltip();
    $.fn.DataTable.ext.pager.numbers_length = 5;
    $(".shareLink").tooltip({
        container: "body",
        template: '<div class="tooltipX" role="tooltip"><div class="tooltip-arrowX"></div><div class="tooltip-innerX">Click para copiar el Link</div></div>'
    });
    slider = $('#searchImagenesCloud').slider({
        formatter: function (value) {
            $("#searchImagenesCloudTxt").html(value + "%");
            return value + "%";
        }
    });
    $(".shareLink").on("shown.bs.tooltip", function () {
        $(".tooltip-arrowX").css("border-right-color", "#3168E4");
        $(".tooltip-innerX").css("background-color", "#3168E4");
        $(".tooltip-innerX").html("Click para copiar el Link");
    });
});

function closeLicencia() {
    window.location.href = "/";
}

function closeLicencia2() {
    $("#modalLicencia2").modal("hide");
}

function acceptLicencia() {
    if (($("#licenciaEntidad").val() == null) || ($("#licenciaEntidad").val() == "")) {
        $("#licenciaAlerta").show();
        return;
    }
    if (($("#licenciaSolicitante").val() == null) || ($("#licenciaSolicitante").val() == "")) {
        $("#licenciaAlerta").show();
        return;
    }
    if (($("#licenciaCorreo").val() == null) || ($("#licenciaCorreo").val() == "")) {
        $("#licenciaAlerta").show();
        return;
    }
    if (($("#licenciaProyecto").val() == null) || ($("#licenciaProyecto").val() == "")) {
        $("#licenciaAlerta").show();
        return;
    }
    if (currentUser != null) {
        currentUser.getIdToken().then(function (currentAccessToken) {
            var params = {};
            params.PRODUCTO = "OTT";
            params.ENTIDAD = $("#licenciaEntidad").val();
            params.SOLICITANTE = $("#licenciaSolicitante").val();
            params.CORREO = $("#licenciaCorreo").val();
            params.PROYECTO = $("#licenciaProyecto").val();
            $.ajax({
                url: web_service + "/servicios?cmd=licencia2&token=" + currentAccessToken + "&t=" + (new Date()).getTime(),
                data: params,
                type: 'POST',
                success: function (data) {
                    if (data.status) {
                        $.confirm({
                            title: "Observatorio de la tierra y el territorio",
                            content: "Datos enviados correctamente",
                            buttons: {
                                Ok: function () {
                                    closeLicencia();
                                }
                            }
                        });
                    } else {
                        $.confirm({
                            title: "Observatorio de la tierra y el territorio",
                            content: "No se pudieron enviar los datos",
                            buttons: {
                                Ok: function () {
                                   
                                }
                            }
                        });
                    }
                },
                error: function (_data) {
                    $.confirm({
                        title: "Observatorio de la tierra y el territorio",
                        content: "No se pudieron enviar los datos",
                        buttons: {
                            Ok: function () {

                            }
                        }
                    });
                }
            });
        }).catch(function (_error) {
            $.confirm({
                title: "Observatorio de la tierra y el territorio",
                content: "No se pudieron enviar los datos",
                buttons: {
                    Ok: function () {

                    }
                }
            });
        });
    }
    
}

function acceptLicencia2() {
    if (($("#licenciaEntidad2").val() == null) || ($("#licenciaEntidad2").val() == "")) {
        $("#licenciaAlerta2").show();
        return;
    }
    if (($("#licenciaSolicitante2").val() == null) || ($("#licenciaSolicitante2").val() == "")) {
        $("#licenciaAlerta2").show();
        return;
    }
    if (($("#licenciaCorreo2").val() == null) || ($("#licenciaCorreo2").val() == "")) {
        $("#licenciaAlerta2").show();
        return;
    }
    if (($("#licenciaProyecto2").val() == null) || ($("#licenciaProyecto2").val() == "")) {
        $("#licenciaAlerta2").show();
        return;
    }
    if (($("#licenciaNombre2").val() == null) || ($("#licenciaNombre2").val() == "")) {
        $("#licenciaAlerta2").show();
        return;
    }
    if (currentUser != null) {
        currentUser.getIdToken().then(function (currentAccessToken) {
            var params = {};
            params.PRODUCTO = $("#licenciaNombre2").val();
            params.ENTIDAD = $("#licenciaEntidad2").val();
            params.SOLICITANTE = $("#licenciaSolicitante2").val();
            params.CORREO = $("#licenciaCorreo2").val();
            params.PROYECTO = $("#licenciaProyecto2").val();
            $.ajax({
                url: web_service + "/servicios?cmd=licencia3&token=" + currentAccessToken + "&t=" + (new Date()).getTime(),
                data: params,
                type: 'POST',
                success: function (data) {
                    if (data.status) {
                        $.confirm({
                            title: "Observatorio de la tierra y el territorio",
                            content: "Datos enviados correctamente",
                            buttons: {
                                Ok: function () {
                                    closeLicencia2();
                                }
                            }
                        });
                    } else {
                        $.confirm({
                            title: "Observatorio de la tierra y el territorio",
                            content: "No se pudieron enviar los datos",
                            buttons: {
                                Ok: function () {

                                }
                            }
                        });
                    }
                },
                error: function (_data) {
                    $.confirm({
                        title: "Observatorio de la tierra y el territorio",
                        content: "No se pudieron enviar los datos",
                        buttons: {
                            Ok: function () {

                            }
                        }
                    });
                }
            });
        }).catch(function (_error) {
            $.confirm({
                title: "Observatorio de la tierra y el territorio",
                content: "No se pudieron enviar los datos",
                buttons: {
                    Ok: function () {

                    }
                }
            });
        });
    }

}

function toggleMedia() {
    backImagenDetalle();
    currentMode = "media";
    $("#searchHeaderMedia").addClass("active");
    $("#searchHeaderAlta").removeClass("active");
    $("#panelSearchNivelImagenesMedia").show();
    $("#panelSearchNivelImagenesAlta").hide();
    $("#panelSearchServicioDetalle").hide();
    updateImagenes();
}

function toggleAlta() {
    backImagenDetalle();
    currentMode = "alta";
    $("#searchHeaderMedia").removeClass("active");
    $("#searchHeaderAlta").addClass("active");
    $("#panelSearchNivelImagenesMedia").hide();
    $("#panelSearchNivelImagenesAlta").show();
    $("#panelSearchServicioDetalle").hide();
    updateImagenes2();
}

function defaultUserPhoto() {
    $("#userPhoto,#userPhoto2").attr("src", "/images/iconos/User.png");
}

function signIn() {
    $("#logoutContainer").hide();
    $("#loginContainer").show();

    var uiConfig = {
        callbacks: {
            signInSuccess: function (_currentUser, _credential, _redirectUrl) {
                closeLogin();
                return false;
            }
        },
        signInOptions: [{
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: [
                'https://www.googleapis.com/auth/plus.login'
            ],
            customParameters: {
                prompt: 'select_account'
            }
        },
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: [
                'public_profile',
                'email'
            ],
            customParameters: {
                auth_type: 'reauthenticate'
            }
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            },
            'apple.com',
            'microsoft.com',
            'yahoo.com',
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInFlow: "popup"
    };

    firebase_ui.start('#authContainer', uiConfig);
}

function signOut() {
    firebase.auth().signOut();
    $("#logoutContainer").hide();
    $("#loginContainer").show();
    currentUser = null;
    currentFuncionalidades = [];
    closeLogin();
}

function validate() {

}

function toggleMain(tipo) {
    modoSearch = tipo;
    $("#searchHeaderEntidad,#searchHeaderArea,#searchHeaderGeoJSON").removeClass("active");
    $("#searchHeaderEntidadDiv,#searchHeaderAreaDiv,#searchHeaderGeoJSONDiv").hide();    
    if (tipo == "entidad") {
        $("#searchHeaderEntidad").addClass("active");
        $("#searchHeaderEntidadDiv").show();        
        areaLayer.setVisibility(false);
        fileLayer.setVisibility(false);
    }
    if (tipo == "area") {
        $("#searchHeaderArea").addClass("active");
        $("#searchHeaderAreaDiv").show();
        areaLayer.setVisibility(true);
        fileLayer.setVisibility(false);
    }
    if (tipo == "geojson") {
        $("#searchHeaderGeoJSON").addClass("active");
        $("#searchHeaderGeoJSONDiv").show();
        areaLayer.setVisibility(false);
        fileLayer.setVisibility(true);
    }
}

function minAllMain() {
    $("#panelSearch").hide();
    $("#headingSearch").hide();
    $("#mainHeading li").removeClass("active");
    closeSearch();
}

function minAll() {
    $("#panelTiempo").hide();
    $("#panelLogin").hide();
    $("#panelLayers").hide();
    $("#panelCoordenadas").hide();
    $("#panelImprimir").hide();
    closeLayers();
    closeCoordenadas();
    toggleTools(false);
}

function toggleTools(param) {
    if (param == null) {
        if ($("#toolsDiv").is(":visible")) {
            param = false;
        } else {
            param = true;
        }
    }
    if (param) {
        minAll();
        $("#toolsDiv").show();
        $("#toolBtn").css("background-image", "url(/images/iconos/Tool_Close.png)");
        reporteUso("Abrir herramientas");
    } else {
        $("#toolsDiv").hide();
        $("#toolBtn").css("background-image", "url(/images/iconos/Tool.png)");
    }
    $("#toolBtn").tooltip('hide');
}

function toggleFiltros(param) {
    if (param == null) {
        if ($("#searchBody").is(":visible")) {
            param = "small";
        } else {
            param = "large"
        }
    }
    if (param == "small") {
        $("#panelSearchToggle").html("<img src='/images/iconos/Open_01.png' alt='Minimizar' style='width: 10px; height: 10px;' />");
        $("#searchBody").hide();
    }
    if (param == "large") {
        $("#panelSearchToggle").html("<img src='/images/iconos/Close_01.png' alt='Minimizar' style='width: 10px; height: 2px;' />");
        $("#searchBody").show();
    }
}

function toggleMenu(param) {
    if (param == null) {
        if ($("#mainDiv").hasClass("main-small")) {
            param = "large";
        } else {
            param = "small";
        }
    }
    if (param == "large") {
        if ($(window).width() <= 768) {
            param = "small";
        } else {
            $("#mainDiv").removeClass("main-small");
            $("#mainDiv").addClass("main-large");
            $("#mapViewDiv,#tableViewDiv").removeClass("main-small-map");
            $("#mapViewDiv,#tableViewDiv").addClass("main-large-map");
            $("#headingSearch img").attr("src", "/images/iconos/Back_02.png");
            $(".item-heading").removeClass("small-heading");
            $(".item-heading").addClass("large-heading");
            $("#menuItem").removeClass("small-heading");
            $("#menuItem").addClass("large-heading");
            toggleFiltros(param);
        }
    }
    if (param == "small") {
        $("#mainDiv").removeClass("main-large");
        $("#mainDiv").addClass("main-small");
        $("#mapViewDiv,#tableViewDiv").removeClass("main-large-map");
        $("#mapViewDiv,#tableViewDiv").addClass("main-small-map");
        $("#headingSearch img").attr("src", "/images/iconos/Forward_02.png");
        $(".item-heading").removeClass("large-heading");
        $(".item-heading").addClass("small-heading");
        $("#menuItem").removeClass("large-heading");
        $("#menuItem").addClass("small-heading");
        toggleFiltros(param);
    }
    if (param == "init") {
        $("#mainDiv").removeClass("main-large");
        $("#mainDiv").addClass("main-small");
        $("#mapViewDiv,#tableViewDiv").removeClass("main-large-map");
        $("#mapViewDiv,#tableViewDiv").addClass("main-small-map");
        $("#headingSearch img").attr("src", "/images/iconos/Forward_02.png");
        $(".item-heading").removeClass("large-heading");
        $(".item-heading").addClass("small-heading");
        $("#menuItem").removeClass("large-heading");
        $("#menuItem").addClass("small-heading");
        param = "small";
    }
    currentEstado = param;
    if (map != null) {
        map.reposition();
        map.resize();
    }
}

function gotoLogin() {
    minAll();
    if (currentUser == null) {
        signIn();
    } else {
        $("#loginContainer").hide();
        $("#logoutContainer").show();
    }
    $("#panelLogin").show();
}

function closeLogin() {
    $("#panelLogin").hide();
}

function gotoTiempo() {
    currentScreen = "Tiempo";
    reporteUso("Abrir tiempo");
    minAll();
    toggleMenu("small");
    $("#panelTiempo").show();
    searchGraphicsLayer.setVisibility(false);
    searchImageLayer.setVisibility(false);
    searchGraphicsLayerDetalle.setVisibility(false);
    searchImageLayerDetalle.setVisibility(false);
    updateTiempo();
}

function borrarSeleccion() {
    $("#selectTile1YPanel").val(null);
    $("#selectTile2YPanel").val(null);
    $("#selectTile1YPanel").trigger("change");
    $("#selectTile2YPanel").trigger("change");
    updateTiempo();
}

function closeTiempo() {
    $("#panelTiempo").hide();
    swipeWidget.disable();
    if (swipeLayer1 != null) {
        map.removeLayer(swipeLayer1);
    }
    if (swipeLayer2 != null) {
        map.removeLayer(swipeLayer2);
    }
    if ($("#panelSearchImagenDetalle").is(":visible")) {
        searchGraphicsLayer.setVisibility(false);
        searchImageLayer.setVisibility(false);
        searchGraphicsLayerDetalle.setVisibility(true);
        searchImageLayerDetalle.setVisibility(true);
    } else {
        searchGraphicsLayer.setVisibility(true);
        searchImageLayer.setVisibility(true);
        searchGraphicsLayerDetalle.setVisibility(false);
        searchImageLayerDetalle.setVisibility(false);
    }

}

function updateTiempo() {
    swipeWidget.disable();
    if (swipeWidget.layers.length > 1) {
        swipeWidget.layers.pop();
    }
    if (swipeWidget.layers.length > 1) {
        swipeWidget.layers.pop();
    }
    if (swipeLayer1 != null) {
        map.removeLayer(swipeLayer1);
    }
    if (swipeLayer2 != null) {
        map.removeLayer(swipeLayer2);
    }
    if (($("#selectTile1YPanel").val() != null) && ($("#selectTile1MPanel").val() != null) &&
        ($("#selectTile1YPanel").val() != "") && ($("#selectTile1MPanel").val() != "")) {
        var layer1 = "global_";
        if ($("#selectTile1MPanel").val().indexOf("q") == -1) {
            layer1 = layer1 + "monthly_";
        } else {
            layer1 = layer1 + "quarterly_";
        }
        layer1 = layer1 + $("#selectTile1YPanel").val();
        if ($("#selectTile1MPanel").val().indexOf("q") == -1) {
            layer1 = layer1 + "_";
        }
        layer1 = layer1 + $("#selectTile1MPanel").val();
        layer1 = layer1 + "_mosaic";

        swipeLayer1 = new esri.WebTiledLayer(web_service + "/imagenes2?cmd=tile&ID=" + layer1 + "&Z=${level}&X=${col}&Y=${row}&token=" + currentAccessToken);
        map.addLayer(swipeLayer1);
    }
    if (($("#selectTile2YPanel").val() != null) && ($("#selectTile2MPanel").val() != null) &&
        ($("#selectTile2YPanel").val() != "") && ($("#selectTile2MPanel").val() != "")) {
        var layer2 = "global_";
        if ($("#selectTile2MPanel").val().indexOf("q") == -1) {
            layer2 = layer2 + "monthly_";
        } else {
            layer2 = layer2 + "quarterly_";
        }
        layer2 = layer2 + $("#selectTile2YPanel").val();
        if ($("#selectTile2MPanel").val().indexOf("q") == -1) {
            layer2 = layer2 + "_";
        }
        layer2 = layer2 + $("#selectTile2MPanel").val();
        layer2 = layer2 + "_mosaic";

        swipeLayer2 = new esri.WebTiledLayer(web_service + "/imagenes2?cmd=tile&ID=" + layer2 + "&Z=${level}&X=${col}&Y=${row}&token=" + currentAccessToken);
        map.addLayer(swipeLayer2);
        swipeWidget.layers.push(swipeLayer2);
        swipeWidget.enable();
    }        
}


function hideAllSearch() {
    $("#mainDiv").animate({ scrollTop: 0 });
    $(".panelSearchFiltro").hide();
    $("#panelSearchNivelImagenes").hide();
    $("#panelSearchImagenDetalle").hide();

    if (searchImageSwipeDetalle != null) {
        searchImageSwipeDetalle.disable();
    }
}

function gotoImagenDetalle(id) {
    hideAllSearch();
    searchGraphicsLayer.setVisibility(false);
    searchImageLayer.setVisibility(false);
    searchGraphicsLayerDetalle.setVisibility(true);
    searchImageLayerDetalle.setVisibility(true);
    map.reorderLayer(searchImageLayerDetalle, map.layerIds.length);
    map.reorderLayer(searchGraphicsLayerDetalle, map.layerIds.length);
    searchImageLayerDetalle.removeAllImages();
    searchImageLayerDetalle.setOpacity(1);
    searchGraphicsLayerDetalle.clear();
    $("#panelSearchImagenDetalle").show();
    $("#panelSearchFiltroImagenes").show();
    $("#detalleImagenAlerta").hide();
    $("#detalleImagen").html("");
    $("#detalleImagenTitle").html("");
    $("#detalleImagenThumb").hide();
    $("#detalleImagenDescarga").hide();

    var dataRow;
    if (currentMode == "media") {
        dataRow = tableSearchBni.data();
        $("#detalleImagenDescarga").hide();
    }
    if (currentMode == "alta") {
        $("#detalleImagenAlerta").show();
        dataRow = tableSearchBni2.data();
        if (cachePermisos.indexOf("IMAGENES_ALTA") != -1) {
            $("#detalleImagenDescarga").show();
        } else {
            $("#detalleImagenDescarga").show();
        }
    }
    for (var i = 0; i < dataRow.length; i++) {
        if (dataRow[i].ID_IMAGEN == id) {
            currentImagen = dataRow[i];
            updateImagenDetalle();
        }
    }
}

function updateImagenDetalle() {
    reporteUso("Detalle imagen", { imagen: currentImagen.ID_IMAGEN });

    if (currentMode == "media") {
        $("#detalleImagenTitle").html("Identificación: " + currentImagen.IMAGEN_ID);
    }
    if (currentMode == "alta") {
        $("#detalleImagenTitle").html("Identificación:<br/>" + currentImagen.IMAGEN_ID);
    }
    $("#detalleImagenTitle").css("padding-bottom", "20px");
    var img = new Image();
    img.onload = function () {
        $("#detalleImagenTitle").css("padding-bottom", "0px");
        $("#detalleImagenThumb").css("background-image", "url('" + this.src + "')");
        $("#detalleImagenThumb").show();
    };
    if (currentMode == "media") {
        img.src = web_service + "/imagenes2?cmd=thumbnail&ID_IMAGEN=" + currentImagen.IMAGEN_ID + "&token=" + currentAccessToken;
    }
    if (currentMode == "alta") {
        img.src = web_service + "/imagenes3?cmd=thumbnail&ID_IMAGEN=" + currentImagen.ID_IMAGEN + "&token=" + currentAccessToken;
    }

    var strHTML = "<table style='width: 100%;' class='table table-striped'>";

    if ((currentImagen.FECHA != null) && (currentImagen.FECHA != "")) {
        strHTML = strHTML + "<tr><td><label><b>Fecha de captura:&nbsp;</b></label></td><td>" + esri.moment(currentImagen.FECHA).format("DD/MM/YYYY") + "</td></tr>";
    }

    var dataJSON = JSON.parse(currentImagen.DATA);
    for (var prop in dataJSON) {
        if (dataJSON.hasOwnProperty(prop)) {
            if (currentMode == "media") {
                var p = getPropertyById(prop);
                if (p != null) {
                    if (p.visible == "TRUE") {
                        strHTML = strHTML + "<tr><td><label aria-hidden='true' data-container='body' data-toggle='popover' data-placement='bottom' data-content=\"<p style='font-size: x-small;'>" + p.tooltip + "</p>\" data-html='true' data-trigger='hover' data-original-title='' title=''><b>" + p.label + ":&nbsp;</b></label></td><td>" + dataJSON[prop] + "</td></tr>";
                    }
                }
            }
            if (currentMode == "alta") {
                var p = getPropertyByIdAlta(prop);
                if (p != null) {
                    if (p.visible == "TRUE") {
                        strHTML = strHTML + "<tr><td><label><b>" + p.label + ":&nbsp;</b></label></td><td>" + dataJSON[prop] + "</td></tr>";
                    }
                }
            }
        }
    }
    if (currentMode == "alta") {
        if (dataJSON.Consulta != null) {
            try {
                var tempStr = [];
                for (var i = 0; i < dataJSON.Consulta.length; i++) {
                    if (dataJSON.Consulta[i].length == 2) {
                        tempStr.push(getUnidadById(dataJSON.Consulta[i]).text);
                    }
                }
                if (tempStr.length > 0) {
                    strHTML = strHTML + "<tr><td><label><b>Departamentos:&nbsp;</b></label></td><td>" + tempStr.join(", ") + "</td></tr>";
                }
                tempStr = [];
                for (var i = 0; i < dataJSON.Consulta.length; i++) {
                    if (dataJSON.Consulta[i].length == 5) {
                        tempStr.push(getUnidadById(dataJSON.Consulta[i]).text);
                    }
                }
                if (tempStr.length > 0) {
                    strHTML = strHTML + "<tr><td><label><b>Municipios:&nbsp;</b></label></td><td>" + tempStr.join(", ") + "</td></tr>";
                }
            } catch (err) {

            }
        }
    }

    strHTML = strHTML + "</table>";
    $("#detalleImagen").html(strHTML);
    $("[data-toggle='popover']").popover();
    if (currentImagen.SHAPE != null) {
        var feature = Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(currentImagen.SHAPE)));
        var g = new esri.Graphic(esri.jsonUtilsGeometry.fromJson(feature));
        g.setSymbol(searchImagenSymbol);
        g.setAttributes({ ID_IMAGEN: currentImagen.ID_IMAGEN });
        searchGraphicsLayerDetalle.add(g);
        centrarImagen();
        
        if (currentMode == "media") {
            if (previewLayer != null) {
                map.removeLayer(previewLayer);
            }
            previewLayer = new esri.WebTiledLayer(web_service + "/imagenes2?cmd=tile_img&ID=" + currentImagen.IMAGEN_ID + "&Z=${level}&X=${col}&Y=${row}&token=" + currentAccessToken);
            map.addLayer(previewLayer);
        }
        if (currentMode == "alta") {
            var mi;
            mi = new esri.MapImage({
                extent: esri.jsonUtilsGeometry.fromJson(feature).getExtent(),
                href: web_service + "/imagenes3?cmd=thumbnail&ID_IMAGEN=" + currentImagen.ID_IMAGEN + "&token=" + currentAccessToken
            });
            searchImageLayerDetalle.addImage(mi);
        }        
    }

}

function toggleImagenDetalleSwipe() {
    if (searchImageSwipeDetalle.enabled) {
        searchImageSwipeDetalle.disable();
    } else {
        searchImageSwipeDetalle.enable();
        if (currentMode == "media") {
            searchImageSwipeDetalle.layers = [previewLayer];
        }
        if (currentMode == "alta") {
            searchImageSwipeDetalle.layers = [searchImageLayerDetalle];
        }        
    }
}

function backImagenDetalle() {
    currentImagen = null;
    if (previewLayer != null) {
        map.removeLayer(previewLayer);
    }
    hideAllSearch();
    searchGraphicsLayer.setVisibility(true);
    searchImageLayer.setVisibility(true);
    searchGraphicsLayerDetalle.setVisibility(false);
    searchImageLayerDetalle.setVisibility(false);
    map.reorderLayer(searchImageLayer, map.layerIds.length);
    map.reorderLayer(searchGraphicsLayer, map.layerIds.length);
    centrarImagenes();
    $("#panelSearchNivelImagenes").show();
    $("#panelSearchFiltroImagenes").show();
}

function updateImagenes() {
    if (tableSearchBni == null) {
        tableSearchBni = $("#tableSearchBni").DataTable({
            dom: '<"bottom"p<"clear">><"#searchImagenesList"><"top"<"clear">>rt<"bottom"pil<"clear">>',
            lengthMenu: [[10, 25, 50, 100, 250], ["Mostrar 10 registros", "Mostrar 20 registros", "Mostrar 50 registros", "Mostrar 100 registros", "Mostrar 250 registros"]],
            language: spanishDataTable,
            order: [[1, 'desc']],
            pageLength: 10,
            processing: false,
            serverSide: true,
            ajax: {
                url: web_service + "/imagenes2",
                deferLoading: 0,
                type: "POST",
                data: function (d) {
                    d.cmd = "query";
                    if (modoSearch == "entidad") {
                        if (($("#searchFiltro").select2("data")[0].type == "DEPTO") || ($("#searchFiltro").select2("data")[0].type == "MUNI")) {
                            d.codigo = $("#searchFiltro").val();
                        }
                    }
                    if (modoSearch == "area") {
                        if (areaLayer.graphics.length > 0) {
                            var data = [];
                            for (var i = 0; i < areaLayer.graphics.length; i++) {
                                if (areaLayer.graphics[i].geometry.type == "extent") {
                                    data.push(Terraformer.ArcGIS.toGeoJSON(esri.Polygon.fromExtent(areaLayer.graphics[i].geometry)));
                                } else {
                                    data.push(Terraformer.ArcGIS.toGeoJSON(areaLayer.graphics[i].geometry));
                                }                                
                            }
                            d.area = btoa(JSON.stringify(data));
                        }
                    }
                    if (modoSearch == "geojson") {
                        if (fileLayer.graphics.length > 0) {
                            var data = [];
                            for (var i = 0; i < fileLayer.graphics.length; i++) {
                                data.push(Terraformer.ArcGIS.toGeoJSON(fileLayer.graphics[i].geometry));
                            }
                            d.area = btoa(JSON.stringify(data));
                        }
                    }
                    if (slider.val() != "50") {
                        var cValue = parseInt(slider.val()) / 100.0;
                        d.cloud = cValue;
                    }
                    if ($("#searchFiltro").select2("data")[0].type == "PAIS") {
                    }
                    if ($("#searchImagenesFechaInicial").val() != null) {
                        d.fechaInicial = $("#searchImagenesFechaInicial").val();
                    }
                    if ($("#searchImagenesFechaFinal").val() != null) {
                        d.fechaFinal = $("#searchImagenesFechaFinal").val();
                    }
                    d.token = currentAccessToken;
                    loading = $.confirm({
                        title: "",
                        content: "<div style='text-align: center;'><img src='/images/ig124.gif' style='height: 200px;width: 200px;'></div>",
                        buttons: {},
                        closeIcon: true,
                        lazyOpen: true,
                        onContentReady: function () {
                            
                        },
                        onOpenBefore: function () {
                            loading.buttons.ok.hide();
                            loading.buttons.close.hide();
                            //loading.showLoading();
                        }
                    });
                    loading.open();
                },
                dataSrc: function (dataRow) {
                    loading.close();
                    if (dataRow.COVERAGE != null) {
                        coberturaRow = dataRow.COVERAGE;
                    } else {
                        coberturaRow = null;
                    }
                    return dataRow.imagenes;
                }
            },
            fnInitComplete: function () {

            },
            drawCallback: function (settings) {
                var api = this.api();
                $("#searchImagenesList").html("");
                $("#searchImagenesCount").html("<i>" + api.page.info().recordsTotal + " resultados</i>");
                if (api.page.info().recordsTotal > 0) {
                    $("#searchImagenesTitle").html("Im&aacute;genes&nbsp<span class='titulo-interior2'>(" + api.page.info().recordsTotal + ")</span>")
                } else {
                    $("#searchImagenesTitle").html("Im&aacute;genes")
                }
                var dataRow = api.rows({ page: 'current' }).data();
                var timeD = (new Date()).getTime();
                searchGraphicsLayer.clear();
                searchImageLayer.removeAllImages();

                for (var i = 0; i < dataRow.length; i++) {
                    var strHTML = "";
                    strHTML = strHTML + "<div class='media media-resultados2' data-id='" + dataRow[i].ID_IMAGEN + "' onclick='gotoImagenDetalle(" + dataRow[i].ID_IMAGEN + ");return false;' >";
                    strHTML = strHTML + "<div class='media-right panel-resultados-media-left'>";
                    var imgURL = web_service + "/imagenes2?cmd=thumbnail&ID_IMAGEN=" + dataRow[i].IMAGEN_ID + "&token=" + currentAccessToken;
                    //if (tableSearchBni.page.len() <= 50) {
                        strHTML = strHTML + "<div class='panel-resultados-media-thumb' style=\"background-image: url('" + imgURL + "'), url('/images/no-disponible.png')\" ></div>";
                    //}
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "<div class='media-body'>";
                    strHTML = strHTML + "<div class='panel panel-default panel-resultados2'>";
                    strHTML = strHTML + "<div class='panel-body'>";
                    strHTML = strHTML + "<div class='panel-resultados-titulo'>" + dataRow[i].IMAGEN_ID + "</div>";
                    strHTML = strHTML + "<div class='panel-resultados-descripcion'>";
                    if ((dataRow[i].FECHA != null) && (dataRow[i].FECHA != "")) {
                        strHTML = strHTML + "<span class='fecha-servicio'>" + esri.moment(dataRow[i].FECHA).format("DD-MM-YYYY") + "</span>";
                    }
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "<div class='media-right panel-resultados-media-right'>";
                    strHTML = strHTML + "<div onclick='gotoImagenDetalle(" + dataRow[i].ID_IMAGEN + ");return false;' class='btn-resultados2'><img src='/images/iconos/Forward_01.png' alt='Ver Detalle' style='width: 25px; height: 25px;' /></div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    $("#searchImagenesList").append(strHTML);

                    if (dataRow[i].SHAPE != null) {
                        var feature = Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(dataRow[i].SHAPE)));
                        var g = new esri.Graphic(esri.jsonUtilsGeometry.fromJson(feature));
                        g.setSymbol(searchImagenSymbol);
                        g.setAttributes({ ID_IMAGEN: dataRow[i].ID_IMAGEN });
                        searchGraphicsLayer.add(g);
                        //if (tableSearchBni.page.len() <= 50) {
                            var mi = new esri.MapImage({
                                extent: esri.jsonUtilsGeometry.fromJson(feature).getExtent(),
                                href: web_service + "/imagenes2?cmd=thumbnail&ID_IMAGEN=" + dataRow[i].IMAGEN_ID + "&token=" + currentAccessToken
                            });
                            searchImageLayer.addImage(mi);
                        //}
                    }
                }
                if (coberturaRow != null) {
                    var feature = Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(coberturaRow)));
                    var g = new esri.Graphic(esri.jsonUtilsGeometry.fromJson(feature));
                    g.setSymbol(searchCoberturaSymbol);
                    searchGraphicsLayer.add(g);
                }
                if (modoSearch == "entidad") {
                    centrarImagenes();
                }
                $("#searchImagenesList .media-resultados2").on("hover").hover(function () {
                    var id = $(this).attr("data-id");
                    for (var i = 0; i < searchGraphicsLayer.graphics.length; i++) {
                        try {
                            if (searchGraphicsLayer.graphics[i].attributes["ID_IMAGEN"] == parseInt(id)) {
                                searchGraphicsLayer.graphics[i].setSymbol(searchImagenActiveSymbol);
                            } else {
                                searchGraphicsLayer.graphics[i].setSymbol(searchImagenSymbol);
                            }
                        } catch (err) {

                        }
                    }
                });
                $("#tableSearchBniTable tr").on("hover").hover(function () {
                    var data = tableSearchBni.row(this).data();
                    for (var i = 0; i < searchGraphicsLayer.graphics.length; i++) {
                        if (searchGraphicsLayer.graphics[i].attributes["ID_IMAGEN"] == data.ID_IMAGEN) {
                            searchGraphicsLayer.graphics[i].setSymbol(searchImagenActiveSymbol);
                        } else {
                            searchGraphicsLayer.graphics[i].setSymbol(searchImagenSymbol);
                        }
                    }
                }, function () {
                });
                var PageInfo = tableSearchBni.page.info();
                tableSearchBni.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + PageInfo.start;
                });
            },
            columns: [
                {
                    orderable: false,
                    data: "ID_IMAGEN",
                    render: function (data, type, row, meta) {
                        return row.ID_IMAGEN;
                    }
                },
                {
                    data: "ID_IMAGEN",
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return esri.moment(row.FECHA).format("DD/MM/YYYY");
                    }
                },
                {
                    orderable: false,
                    data: "ID_IMAGEN",
                    render: function (data, type, row, meta) {
                        return row.IMAGEN_ID;
                    }
                },
                {
                    data: "ID_IMAGEN",
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return "<div class='btn-resultados3'><img src='/images/iconos/Forward_01.png' alt='Ver Detalle' style='width: 25px; height: 25px;'></div>";
                    }
                }
            ]
        });
        $("#tableSearchBni tbody").on("click", "tr", function () {
            var data = tableSearchBni.row(this).data();
            gotoImagenDetalle(data.ID_IMAGEN);
        });
    } else {
        tableSearchBni.ajax.reload();
    }
}

function updateImagenes2() {
    if (tableSearchBni2 == null) {
        tableSearchBni2 = $("#tableSearchBni2").DataTable({
            dom: '<"bottom"p<"clear">><"#searchImagenesList2"><"top"<"clear">>rt<"bottom"pil<"clear">>',
            lengthMenu: [[10, 25, 50, 100, 250], ["Mostrar 10 registros", "Mostrar 20 registros", "Mostrar 50 registros", "Mostrar 100 registros", "Mostrar 250 registros"]],
            language: spanishDataTable,
            order: [[1, 'desc']],
            pageLength: 10,
            processing: false,
            serverSide: true,
            ajax: {
                url: web_service + "/imagenes3",
                deferLoading: 0,
                type: "POST",
                data: function (d) {
                    d.cmd = "query";
                    if (modoSearch == "entidad") {
                        if (($("#searchFiltro").select2("data")[0].type == "DEPTO") || ($("#searchFiltro").select2("data")[0].type == "MUNI")) {
                            d.codigo = $("#searchFiltro").val();
                        }
                    }
                    if (modoSearch == "area") {
                        if (areaLayer.graphics.length > 0) {
                            var data = [];
                            for (var i = 0; i < areaLayer.graphics.length; i++) {
                                if (areaLayer.graphics[i].geometry.type == "extent") {
                                    data.push(Terraformer.ArcGIS.toGeoJSON(esri.Polygon.fromExtent(areaLayer.graphics[i].geometry)));
                                } else {
                                    data.push(Terraformer.ArcGIS.toGeoJSON(areaLayer.graphics[i].geometry));
                                }
                            }
                            d.area = btoa(JSON.stringify(data));
                        }
                    }
                    if (modoSearch == "geojson") {
                        if (fileLayer.graphics.length > 0) {
                            var data = [];
                            for (var i = 0; i < fileLayer.graphics.length; i++) {
                                data.push(Terraformer.ArcGIS.toGeoJSON(fileLayer.graphics[i].geometry));
                            }
                            d.area = btoa(JSON.stringify(data));
                        }
                    }
                    if (slider.val() != "50") {
                        var cValue = parseInt(slider.val()) / 100.0;
                        d.cloud = cValue;
                    }
                    if ($("#searchFiltro").select2("data")[0].type == "PAIS") {
                    }
                    d.token = currentAccessToken;
                    loading = $.confirm({
                        title: "",
                        content: "<div style='text-align: center;'><img src='/images/ig124.gif' style='height: 200px;width: 200px;'></div>",
                        buttons: {},
                        closeIcon: true,
                        lazyOpen: true,
                        onContentReady: function () {

                        },
                        onOpenBefore: function () {
                            loading.buttons.ok.hide();
                            loading.buttons.close.hide();
                            //loading.showLoading();
                        }
                    });
                    loading.open();
                },
                dataSrc: function (dataRow) {
                    loading.close();
                    if (dataRow.COVERAGE != null) {
                        coberturaRow = dataRow.COVERAGE;
                    } else {
                        coberturaRow = null;
                    }
                    return dataRow.imagenes;
                }
            },
            fnInitComplete: function () {

            },
            drawCallback: function (settings) {
                var api = this.api();
                $("#searchImagenesList2").html("");
                $("#searchImagenesCount2").html("<i>" + api.page.info().recordsTotal + " resultados</i>");
                var dataRow = api.rows({ page: 'current' }).data();
                var timeD = (new Date()).getTime();
                searchGraphicsLayer.clear();
                searchImageLayer.removeAllImages();

                for (var i = 0; i < dataRow.length; i++) {
                    var strHTML = "";
                    strHTML = strHTML + "<div class='media media-resultados2' data-id='" + dataRow[i].ID_IMAGEN + "' onclick='gotoImagenDetalle(" + dataRow[i].ID_IMAGEN + ");return false;' >";
                    strHTML = strHTML + "<div class='media-right panel-resultados-media-left'>";
                    var imgURL = web_service + "/imagenes3?cmd=thumbnail&ID_IMAGEN=" + dataRow[i].ID_IMAGEN + "&token=" + currentAccessToken;
                    //if (tableSearchBni.page.len() <= 50) {
                    strHTML = strHTML + "<div class='panel-resultados-media-thumb' style=\"background-image: url('" + imgURL + "'), url('/images/no-disponible.png')\" ></div>";
                    //}
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "<div class='media-body'>";
                    strHTML = strHTML + "<div class='panel panel-default panel-resultados2'>";
                    strHTML = strHTML + "<div class='panel-body'>";
                    strHTML = strHTML + "<div class='panel-resultados-titulo'>" + dataRow[i].IMAGEN_ID + "</div>";
                    strHTML = strHTML + "<div class='panel-resultados-descripcion'>";
                    if ((dataRow[i].FECHA != null) && (dataRow[i].FECHA != "")) {
                        strHTML = strHTML + "<span class='fecha-servicio'>" + esri.moment(dataRow[i].FECHA).format("DD-MM-YYYY") + "</span>";
                    }
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "<div class='media-right panel-resultados-media-right'>";
                    strHTML = strHTML + "<div onclick='gotoImagenDetalle(" + dataRow[i].ID_IMAGEN + ");return false;' class='btn-resultados2'><img src='/images/iconos/Forward_01.png' alt='Ver Detalle' style='width: 25px; height: 25px;' /></div>";
                    strHTML = strHTML + "</div>";
                    strHTML = strHTML + "</div>";
                    $("#searchImagenesList2").append(strHTML);

                    if (dataRow[i].SHAPE != null) {
                        var feature = Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(dataRow[i].SHAPE)));
                        var g = new esri.Graphic(esri.jsonUtilsGeometry.fromJson(feature));
                        g.setSymbol(searchImagenSymbol);
                        g.setAttributes({ ID_IMAGEN: dataRow[i].ID_IMAGEN });
                        searchGraphicsLayer.add(g);
                        //if (tableSearchBni.page.len() <= 50) {
                        var mi = new esri.MapImage({
                            extent: esri.jsonUtilsGeometry.fromJson(feature).getExtent(),
                            href: web_service + "/imagenes3?cmd=thumbnail&ID_IMAGEN=" + dataRow[i].ID_IMAGEN + "&token=" + currentAccessToken
                        });
                        searchImageLayer.addImage(mi);
                        //}
                    }
                }
                if (coberturaRow != null) {
                    var feature = Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(coberturaRow)));
                    var g = new esri.Graphic(esri.jsonUtilsGeometry.fromJson(feature));
                    g.setSymbol(searchCoberturaSymbol);
                    searchGraphicsLayer.add(g);
                }
                if (modoSearch == "entidad") {
                    centrarImagenes();
                }
                $("#searchImagenesList2 .media-resultados2").on("hover").hover(function () {
                    var id = $(this).attr("data-id");
                    for (var i = 0; i < searchGraphicsLayer.graphics.length; i++) {
                        try {
                            if (searchGraphicsLayer.graphics[i].attributes["ID_IMAGEN"] == parseInt(id)) {
                                searchGraphicsLayer.graphics[i].setSymbol(searchImagenActiveSymbol);
                            } else {
                                searchGraphicsLayer.graphics[i].setSymbol(searchImagenSymbol);
                            }
                        } catch (err) {

                        }
                    }
                });
                $("#tableSearchBniTable2 tr").on("hover").hover(function () {
                    var data = tableSearchBni2.row(this).data();
                    for (var i = 0; i < searchGraphicsLayer.graphics.length; i++) {
                        if (searchGraphicsLayer.graphics[i].attributes["ID_IMAGEN"] == data.ID_IMAGEN) {
                            searchGraphicsLayer.graphics[i].setSymbol(searchImagenActiveSymbol);
                        } else {
                            searchGraphicsLayer.graphics[i].setSymbol(searchImagenSymbol);
                        }
                    }
                }, function () {
                });
                var PageInfo = tableSearchBni2.page.info();
                tableSearchBni2.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1 + PageInfo.start;
                });
            },
            columns: [
                {
                    orderable: false,
                    data: "ID_IMAGEN",
                    render: function (data, type, row, meta) {
                        return row.ID_IMAGEN;
                    }
                },
                {
                    data: "ID_IMAGEN",
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return esri.moment(row.FECHA).format("DD/MM/YYYY");
                    }
                },
                {
                    orderable: false,
                    data: "ID_IMAGEN",
                    render: function (data, type, row, meta) {
                        return row.IMAGEN_ID;
                    }
                },
                {
                    data: "ID_IMAGEN",
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return "<div class='btn-resultados3'><img src='/images/iconos/Forward_01.png' alt='Ver Detalle' style='width: 25px; height: 25px;'></div>";
                    }
                }
            ]
        });
        $("#tableSearchBni2 tbody").on("click", "tr", function () {
            var data = tableSearchBni2.row(this).data();
            gotoImagenDetalle(data.ID_IMAGEN);
        });
    } else {
        tableSearchBni2.ajax.reload();
    }
}

function centrarImagen() {
    if (searchGraphicsLayerDetalle.graphics.length > 0) {
        map.setExtent(esri.graphicsUtils.graphicsExtent(searchGraphicsLayerDetalle.graphics).expand(4));
    }
}

function centrarImagenes() {
    if (firstSearch) {
        firstSearch = false;
        return;
    }
    if (searchGraphicsLayer.visible) {
        if (searchGraphicsLayer.graphics.length > 0) {
            map.setExtent(esri.graphicsUtils.graphicsExtent(searchGraphicsLayer.graphics).expand(4));
        }
    }
}

function cancelBubble(e) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
}

function gotoSearchUnidad(id) {
    $("#searchFiltro").val(id);
    $("#searchFiltro").trigger("change");
}

function gotoLayers() {
    currentScreen = "layers";
    reporteUso("Abrir mapa base y capas");
    toggleMenu("small");
    minAll();
    $("#selectBasemapPanel").val(currentBasemap);
    $("#panelLayers").show();
}

function closeLayers() {
    $("#panelLayers").hide();
}

function updateCoordenada(evt) {
    try {
        var to = sistemasCoordenadas[$("#querySearchConsultaFormat").val()].proj;
        var from = sistemasCoordenadas["EPSG:3857"].proj;
        var reprojectedCoordsNew = proj4(from, to, [evt.mapPoint.x, evt.mapPoint.y]);
        var coordTextX;
        var coordTextY;
        var labelLatitud = sistemasCoordenadas[$("#querySearchConsultaFormat").val()].labLat;
        var labelLongitud = sistemasCoordenadas[$("#querySearchConsultaFormat").val()].labLng;
        if ($("#querySearchConsultaFormat").val() == "EPSG:4326") {
            coordTextY = reprojectedCoordsNew[1].toFixed(6);
            coordTextX = reprojectedCoordsNew[0].toFixed(6);
        }
        if ($("#querySearchConsultaFormat").val() == "EPSG:4686") {
            coordTextY = reprojectedCoordsNew[1].toFixed(6);
            coordTextX = reprojectedCoordsNew[0].toFixed(6);
        }
        if ($("#querySearchConsultaFormat").val() == "EPSG:3857") {
            coordTextY = parseFloat(evt.mapPoint.y.toFixed(4)).toLocaleString('es');
            coordTextX = parseFloat(evt.mapPoint.x.toFixed(4)).toLocaleString('es');
        }
        if ($("#querySearchConsultaFormat").val() == "EPSG:9377") {
            coordTextY = reprojectedCoordsNew[1].toFixed(6);
            coordTextX = reprojectedCoordsNew[0].toFixed(6);
        }
        if (($("#querySearchConsultaFormat").val() == "EPSG:3114") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:3115") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:3116") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:3117") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:3118")) {
            coordTextY = parseFloat(reprojectedCoordsNew[1].toFixed(4)).toLocaleString('es');
            coordTextX = parseFloat(reprojectedCoordsNew[0].toFixed(4)).toLocaleString('es');
        }
        if (($("#querySearchConsultaFormat").val() == "EPSG:32617") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:32618") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:32619") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:32717") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:32718") ||
            ($("#querySearchConsultaFormat").val() == "EPSG:32719")) {
            coordTextY = parseFloat(reprojectedCoordsNew[1].toFixed(4)).toLocaleString('es');
            coordTextX = parseFloat(reprojectedCoordsNew[0].toFixed(4)).toLocaleString('es');
        }
        $("#resultadoConsultaCoordenadasY").html(labelLongitud + ":&nbsp;" + coordTextX);
        $("#resultadoConsultaCoordenadasX").html(labelLatitud + ":&nbsp;" + coordTextY);

        var labelLatitudSM;
        if (labelLatitud == "Norte (m)") {
            labelLatitudSM = "N: ";
        }
        if (labelLatitud == "Latitud (N)") {
            labelLatitudSM = "N: ";
        }
        var labelLongitudSM;
        if (labelLongitud == "Este (m)") {
            labelLongitudSM = "E: ";
        }
        if (labelLongitud == "Longitud (W)") {
            labelLongitudSM = "W: ";
        }
        $("#coordinatesDiv").html(labelLatitudSM + coordTextY + ", " + labelLongitudSM + coordTextX + " (" + $("#querySearchConsultaFormat").val() + ")");
    } catch (err) {

    }
}

function toggleViewImagenes() {
    if ($("#searchImagenesBtnList").hasClass("active")) {
        $("#searchImagenesBtnList").removeClass("active");
        $("#searchImagenesBtnGrid").addClass("active");
        $("#searchImagenesBtnList img").attr("src", "/images/iconos/List_Gray.png");
        $("#searchImagenesBtnGrid img").attr("src", "/images/iconos/Tiles_Blue.png");
        $("#searchImagenesList").show();
        $("#tableSearchBni").hide();
    } else {
        $("#searchImagenesBtnList").addClass("active");
        $("#searchImagenesBtnGrid").removeClass("active");
        $("#searchImagenesBtnList img").attr("src", "/images/iconos/List_Blue.png");
        $("#searchImagenesBtnGrid img").attr("src", "/images/iconos/Tiles_Gray.png");
        $("#searchImagenesList").hide();
        $("#tableSearchBni").show();
    }
}

function toggleViewImagenes2() {
    if ($("#searchImagenesBtnList2").hasClass("active")) {
        $("#searchImagenesBtnList2").removeClass("active");
        $("#searchImagenesBtnGrid2").addClass("active");
        $("#searchImagenesBtnList2 img").attr("src", "/images/iconos/List_Gray.png");
        $("#searchImagenesBtnGrid2 img").attr("src", "/images/iconos/Tiles_Blue.png");
        $("#searchImagenesList2").show();
        $("#tableSearchBni2").hide();
    } else {
        $("#searchImagenesBtnList2").addClass("active");
        $("#searchImagenesBtnGrid2").removeClass("active");
        $("#searchImagenesBtnList2 img").attr("src", "/images/iconos/List_Blue.png");
        $("#searchImagenesBtnGrid2 img").attr("src", "/images/iconos/Tiles_Gray.png");
        $("#searchImagenesList2").hide();
        $("#tableSearchBni2").show();
    }
}

function gotoCoordenadas() {
    currentScreen = "coordenadas";
    reporteUso("Abrir coordenadas");
    toggleMenu("small");
    minAll();
    $("#panelCoordenadas").show();
}

function buscarCoordenada() {
    coordsLayer.clear();
    map.infoWindow.hide();

    try {
        var strLatitud = replaceAll(replaceAll(replaceAll($("#querySearchCoordinateLatitud").val(), ", ", " "), ",", "."), "  ", " ").trim();
        var strLongitud = replaceAll(replaceAll(replaceAll($("#querySearchCoordinateLongitud").val(), ", ", " "), ",", "."), "  ", " ").trim();

        if (strLatitud != "" && strLongitud != "") {
            var lat = parseFloat(strLatitud);
            var lng = parseFloat(strLongitud);

            var to = sistemasCoordenadas["EPSG:4326"].proj;
            var from = sistemasCoordenadas[$("#querySearchCoordinateFormat").val()].proj;
            var reprojectedCoordsNew = proj4(from, to, [lng, lat]);

            lat = reprojectedCoordsNew[1];
            lng = reprojectedCoordsNew[0];

            var pst = esri.webMercatorUtils.geographicToWebMercator(new esri.Point({
                x: lng,
                y: lat,
                spatialReference: {
                    wkid: 4686
                }
            }));
            coordsLayer.add(new esri.Graphic(pst, pointMarker, {
                "Latitud": lat,
                "Longitud": lng,
                "Coordenadas": $("#querySearchCoordinateFormat :selected").text()
            }));
            map.centerAndZoom(esri.graphicsUtils.graphicsExtent(coordsLayer.graphics).getCenter(), 14);
        }

    } catch (err) {

    }
}


function closeCoordenadas() {
    if (coordsLayer != null) {
        coordsLayer.clear();
    }
    $("#panelCoordenadas").hide();
}


function gotoDibujar() {
    currentScreen = "dibujar";
    reporteUso("Abrir dibujo y medición");
    toggleMenu("small");
    minAll();
    $("#panelDibujar").show();
}

function closeDibujar() {
    if (map != null) {
        map.enableMapNavigation();
        if (drawTool != null) {
            drawTool.deactivate();
        }
        if (editTool != null) {
            editTool.deactivate();
        }
    }
    $("#panelDibujar").hide();
}

function modoDibujo(tipo) {
    editTool.deactivate();
    map.disableMapNavigation();

    $("#drawEdit").show();
    $("#drawClean").hide();
    $("#drawIntro").hide();

    $("#measureDivContainer").hide();
    $("#drawOptsFill").hide();
    $("#drawOptsText").hide();
    $("#drawCurrentTool").hide();
    $("#drawOptsLine").hide();

    $("#drawText").val("Texto");
    $("#drawOptFillColor").colorpicker("setValue", "rgba(171, 156, 202, 0.75)");
    $("#drawOptLineColor").colorpicker("setValue", "rgba(62, 106, 149, 0.75)");

    activeTool = tipo.toLowerCase();
    if (activeTool == "text") {
        drawTool.activate("point");
        $("#drawOptsFill").show();
        $("#drawOptsText").show();
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Texto");
    }
    if (activeTool == "point") {
        drawTool.activate("point");
        $("#drawOptsFill").hide();
        $("#drawOptsText").hide();
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Punto");
    }
    if (activeTool == "line") {
        $("#drawOptsLine").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("L&iacute;nea");
    }
    if (activeTool == "polyline") {
        $("#drawOptsLine").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Pol&iacute;nea");
    }
    if (activeTool == "freehandpolyline") {
        $("#drawOptsLine").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Pol&iacute;nea a mano alzada");
    }
    if (activeTool == "triangle") {
        $("#drawOptsLine").show();
        $("#drawOptsFill").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Tri&aacute;ngulo");
    }
    if (activeTool == "circle") {
        $("#drawOptsLine").show();
        $("#drawOptsFill").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("C&iacute;rculo");
    }
    if (activeTool == "ellipse") {
        $("#drawOptsLine").show();
        $("#drawOptsFill").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Elipse");
    }
    if (activeTool == "polygon") {
        $("#drawOptsLine").show();
        $("#drawOptsFill").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Pol&iacute;gono");
    }
    if (activeTool == "freehandpolygon") {
        $("#drawOptsLine").show();
        $("#drawOptsFill").show();
        drawTool.activate(activeTool);
        $("#drawCurrentTool").show();
        $("#drawCurrentTool").html("Pol&iacute;gono a mano alzada");
    }

}

function modoCleanDibujo() {
    $("#drawEdit").hide();
    $("#drawIntro").hide();
    $("#drawClean").show();
    $("#drawCurrentTool").html("");
}

function deleteDibujo() {
    dibujoLayer.remove(editTool.getCurrentState().graphic);
    editTool.deactivate();
}

function cleanDibujo() {
    currentDibujo = null;
    dibujoLayer.clear();
    editTool.deactivate();
}


function exportDibujo() {
    var features = [];
    for (var i = 0; i < dibujoLayer.graphics.length; i++) {
        var feature = dibujoLayer.graphics[i];
        feature.geometry = esri.webMercatorUtils.webMercatorToGeographic(feature.geometry);
        feature.properties = [];
        features.push(Terraformer.ArcGIS.toGeoJSON(feature));
    }
    var jsonString = encodeURIComponent(JSON.stringify({
        type: "FeatureCollection",
        features: features
    }));
    var link = document.createElement('a');
    link.href = "data:text/json;charset=utf-8," + jsonString;
    link.download = "Export.json";
    link.target = "_self";
    link.click();
}


function volverDibujoMain() {
    editTool.deactivate();
    $("#drawEdit").hide();
    $("#drawIntro").show();
}

function updateEditMeasure(g) {
    if (g != null) {
        currentMeasureGraphic = g;
    }
    var strHTML = "";
    var strHTML2 = "";

    if ((activeTool == "line") || (activeTool == "polyline") || (activeTool == "freehandpolyline")) {
        $("#measureDivAreaUnits").hide();
        $("#measureDivLengthUnits").show();
        $("#measureDivContainer").show();

        try {
            if ($("#measureLengthUnit").val() == "kilometers") {
                strHTML2 = strHTML2 + "Longitud: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "kilometers").toFixed(2) + " Kilómetros";
            }
            if ($("#measureLengthUnit").val() == "meters") {
                strHTML2 = strHTML2 + "Longitud: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "meters").toFixed(2) + " Metros";
            }
            if ($("#measureLengthUnit").val() == "feet") {
                strHTML2 = strHTML2 + "Longitud: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "feet").toFixed(2) + " Pies";
            }
            if ($("#measureLengthUnit").val() == "miles") {
                strHTML2 = strHTML2 + "Longitud: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "miles").toFixed(2) + " Millas";
            }
            if ($("#measureLengthUnit").val() == "yards") {
                strHTML2 = strHTML2 + "Longitud: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "yards").toFixed(2) + " Yardas";
            }
        } catch (err) {

        }

    } else {
        if ((activeTool == "triangle") || (activeTool == "circle") || (activeTool == "ellipse") || (activeTool == "polygon") || (activeTool == "freehandpolygon")) {
            $("#measureDivAreaUnits").show();
            $("#measureDivLengthUnits").show();
            $("#measureDivContainer").show();

            try {
                if ($("#measureAreaUnit").val() == "hectares") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "hectares").toFixed(2) + " Hectareas";
                }
                if ($("#measureAreaUnit").val() == "square-kilometers") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "square-kilometers").toFixed(2) + " Kilómetros cuadrados";
                }
                if ($("#measureAreaUnit").val() == "square-meters") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "square-meters").toFixed(2) + " Metros cuadrados";
                }
                if ($("#measureAreaUnit").val() == "square-feet") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "square-feet").toFixed(2) + " Pies cuadrados";
                }
                if ($("#measureAreaUnit").val() == "square-miles") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "square-miles").toFixed(2) + " Millas cuadradas";
                }
                if ($("#measureAreaUnit").val() == "square-yards") {
                    strHTML = strHTML + "&Aacute;rea: " + esri.geometryEngine.geodesicArea(currentMeasureGraphic.geometry, "square-yards").toFixed(2) + " Yardas cuadradas";
                }
            } catch (err) {

            }
            try {
                if ($("#measureLengthUnit").val() == "kilometers") {
                    strHTML2 = strHTML2 + "Per&iacute;metro: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "kilometers").toFixed(2) + " Kilómetros";
                }
                if ($("#measureLengthUnit").val() == "meters") {
                    strHTML2 = strHTML2 + "Per&iacute;metro: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "meters").toFixed(2) + " Metros";
                }
                if ($("#measureLengthUnit").val() == "feet") {
                    strHTML2 = strHTML2 + "Per&iacute;metro: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "feet").toFixed(2) + " Pies";
                }
                if ($("#measureLengthUnit").val() == "miles") {
                    strHTML2 = strHTML2 + "Per&iacute;metro: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "miles").toFixed(2) + " Millas";
                }
                if ($("#measureLengthUnit").val() == "yards") {
                    strHTML2 = strHTML2 + "Per&iacute;metro: " + esri.geometryEngine.geodesicLength(currentMeasureGraphic.geometry, "yards").toFixed(2) + " Yardas";
                }
            } catch (err) {

            }

        } else {
            $("#measureDivContainer").hide();
        }
    }
    $("#measureDivArea").html(strHTML);
    $("#measureDivLength").html(strHTML2);
}

function updateEditGraphic() {
    var cLine = esri.Color.fromString($("#drawOptLineColorInput").val()).toRgba();
    var cFill = esri.Color.fromString($("#drawOptFillColorInput").val()).toRgba();

    var cLineDef = esri.Color.fromArray(cLine);
    var cFillDef = esri.Color.fromArray(cFill);

    if (editTool.getCurrentState().graphic.symbol.type == "textsymbol") {
        var csize = editTool.getCurrentState().graphic.symbol.font.size;
        editTool.getCurrentState().graphic.setSymbol(new esri.TextSymbol($("#drawText").val(), new esri.Font(csize), cFillDef));
    }
    if (editTool.getCurrentState().graphic.symbol.type == "simplelinesymbol") {
        editTool.getCurrentState().graphic.setSymbol(new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2));
    }
    if (editTool.getCurrentState().graphic.symbol.type == "simplefillsymbol") {
        editTool.getCurrentState().graphic.setSymbol(new esri.SimpleFillSymbol(esri.SimpleLineSymbol.STYLE_SOLID,
            new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2),
            cFillDef));
    }
}

function gotoImprimir() {
    currentScreen = "imprimir";
    reporteUso("Abrir imprimir");
    toggleMenu("small");
    minAll();
    $("#panelImprimir").show();
}

function closeImprimir() {
    $("#panelImprimir").hide();
}

function printMap() {
    showLoading("Preparando impresi&oacute;n", "loading", "gold", false);
    printer.printMap({
        layout: $("#selectPrintTemplate").val(),
        format: $("#selectPrintFormat").val(),
        preserveScale: false,
        layoutOptions: {
            scalebarUnit: "Kilometers",
            titleText: $("#printTitle").val()
        },
        exportOptions: {
            width: $(window).width(),
            height: $(window).height(),
            dpi: $("#selectPrintDPI").val()
        }
    });
}

function getShareUrl() {
    if ((esri == null) || (map == null)) {
        return "/";
    }
    var url = window.location.origin;
    url = url + window.location.pathname + "?";
    var mapext = esri.webMercatorUtils.webMercatorToGeographic(map.extent);
    url = url + "e=" + mapext.xmin + "," + mapext.ymin + "," + mapext.xmax + "," + mapext.ymax + "," + 4686;
    url = url + "&";
    url = url + "b=" + currentBasemap;
    if ($("#searchFiltro").val() != null) {
        url = url + "&u=" + $("#searchFiltro").val();        
    }
    return url;
}

function copyShareLink() {
    Clipboard.copy($("#urlShare").val());
}

function reporteUso(funcionalidad, parametro) {
    /*
    if (parametro == null) {
        try {
            gtag('event', funcionalidad, {
                'send_to': 'G-7RHX7BC8DP',
                'event_category': funcionalidad
            });
        } catch (err) {
            console.log(err);
        }
        return;
    }
    var value = null;
    if (parametro.unidad != null) {
        value = parametro.unidad;
    }
    if (parametro.tematica != null) {
        value = parametro.tematica;
    }
    if (parametro.estacion != null) {
        value = parametro.estacion;
    }
    if (parametro.imagen != null) {
        value = parametro.imagen;
    }
    if (parametro.carto != null) {
        value = parametro.carto;
    }
    if (parametro.servicio != null) {
        value = parametro.servicio;
    }
    if (parametro.plancha != null) {
        value = parametro.plancha;
    }

    try {
        gtag('event', funcionalidad, {
            'send_to': 'G-7RHX7BC8DP',
            'event_category': funcionalidad,
            'event_action': parametro.action,
            'event_label': value,
        });
    } catch (err) {

    }
    */
}

function closeLoading() {
    $("#alertList").hide();
}

function showLoading(text, imagen, color, autohide) {
    $("#alertContent").html(text);
    if (imagen == null) {
        $("#alertContentLeft").hide();
    } else {
        if (imagen == "loading") {
            $("#alertContentLeft img").attr("src", "/images/iconos/clock-face-three-oclock_1f552.png");
        }
        if (imagen == "ok") {
            $("#alertContentLeft img").attr("src", "/images/iconos/thumbs-up-sign_1f44d.png");
        }
        if (imagen == "error") {
            $("#alertContentLeft img").attr("src", "/images/iconos/smiling-face-with-smiling-eyes-and-hand-covering-mouth_1f92d.png");
        }
        $("#alertContentLeft").show();
    }
    $("#alertHeader").css("background-color", color);
    if (autohide) {
        setTimeout(function () { closeLoading(); }, defaultAlertTimer);
    }
    $("#alertList").show();
}

function gotoServicioDetalle() {    
    hideAllSearch();
    $("#panelSearchServicioDetalle").show();
    $("#panelSearchFiltroImagenes").show();
    $("#detalleServicioNombre").html("");
    $("#detalleServicio").html("");
    $("#detalleServicioBtn").hide();
    $("#detalleServicioBtn2").hide();

    currentServicio = {
        NOMBRE: "Cobertura imágenes alta resolución",
        RESUMEN: "Cubrimiento de las imágenes satelitales de alta resolución dispuestas para la descarga bajo solicitud al IGAC y limitada dentro del Observatorio de la Tierra y el Territorio, actualmente se cuenta con un cubrimiento de aproximadamente el 50% del territorio Colombiano, con un alcance cerca de 55 millones de hectáreas para el 2024.",
        URL_SERVICIO: "https://mapas.igac.gov.co/server/rest/services/otros/coberturaaltaresolucion/MapServer",
        TIPO: "Arcgis MapServer"
    };
    updateServicioDetalle();
}

function updateServicioDetalle() {
    $("#detalleServicioNombre").html(currentServicio.NOMBRE);
    var strHTML = "";
    if ((currentServicio.ID_ENTIDAD != null) && (currentServicio.ID_ENTIDAD != "")) {
        strHTML = strHTML + "<b>Entidad:&nbsp;</b>" + getEntidadById(currentServicio.ID_ENTIDAD).text + "<br />";
    }
    if ((currentServicio.RESUMEN != null) && (currentServicio.RESUMEN != "")) {
        strHTML = strHTML + "<b>Resumen:&nbsp;</b><p style='line-height: 1.1em;'>" + currentServicio.RESUMEN + "</p>";
    }
    if ((currentServicio.ESCALA != null) && (currentServicio.ESCALA != "")) {
        strHTML = strHTML + "<b>Nivel de detalle:&nbsp;</b>" + currentServicio.ESCALA + "<br />";
    }
    if ((currentServicio.FECHA != null) && (currentServicio.FECHA != "")) {
        strHTML = strHTML + "<b>Fecha:&nbsp;</b>" + esri.moment(currentServicio.FECHA).format("DD-MM-YYYY") + "<br />";
    }
    if ((currentServicio.LICENCIA != null) && (currentServicio.LICENCIA != "")) {
        if (currentServicio.LICENCIA == "CC BY 4.0") {
            strHTML = strHTML + "<b>Licencia:&nbsp;</b><a href='https://creativecommons.org/licenses/by/4.0/deed.es' target='_blank'>" + currentServicio.LICENCIA + "</a><br/>";
        } else {
            if (currentServicio.LICENCIA == "CC BY SA 4.0") {
                strHTML = strHTML + "<b>Licencia:&nbsp;</b><a href='https://creativecommons.org/licenses/by-sa/4.0/deed.es' target='_blank'>" + currentServicio.LICENCIA + "</a><br/>";
            } else {
                strHTML = strHTML + "<b>Licencia:&nbsp;</b><p style='line-height: 1.1em;'>" + currentServicio.LICENCIA + "</p><br/>";
            }
        }
    }
    $("#detalleServicio").html(strHTML);

    if ((currentServicio.URL_SERVICIO != null) && (currentServicio.URL_SERVICIO != "")) {
        if (activeLayers.indexOf(currentServicio.NOMBRE) == -1) {
            $("#detalleServicioBtn").show();
            $("#detalleServicioBtn2").hide();
        } else {
            $("#detalleServicioBtn").hide();
            $("#detalleServicioBtn2").show();
        }
    } else {
        $("#detalleServicioBtn").hide();
        $("#detalleServicioBtn2").hide();
    }

    if (strHTML != "") {
        $("#detalleServicioDescarga").show();
    } else {
        $("#detalleServicioDescarga").hide();
    }

}


function backServicioDetalle() {
    $("#panelSearchServicioDetalle").hide();
    $("#panelSearchFiltroImagenes").show();    
    $("#panelSearchNivelImagenes").show();
    $("#panelSearchNivelImagenesAlta").show();
}

function quitarServicio() {
    removeLayer(currentServicio.NOMBRE);
}

function removeLayer(id) {
    try {
        map.removeLayer(map.getLayer(id));
    } catch (err) {

    }
    try {
        activeLayers = activeLayers.filter(e => e !== id);
    } catch (err) {

    }
    if (currentServicio != null) {
        if (currentServicio.NOMBRE == id) {
            $("#detalleServicioBtn").show();
            $("#detalleServicioBtn2").hide();
        }
    }
}

function loadServicio() {
    if (activeLayers.indexOf(currentServicio.NOMBRE) != -1) {
        showLoading("La capa ya se encuentra activa en el mapa", null, "red", true);
        return;
    }
    $("#detalleServicioBtn").hide();
    $("#detalleServicioBtn2").show();

    if (currentServicio.TIPO == "Arcgis MapServer") {
        addLayer_MapServer(currentServicio.URL_SERVICIO, currentServicio.NOMBRE);
    }    
}

function addLayer_MapServer(url, name) {
    showLoading("Un segundo. Estamos agregando la capa...", "loading", "gold", false);
    var tlayer = new esri.ArcGISDynamicMapServiceLayer(url, {
        id: name,
    });
    tlayer.on("error", function (err) {
        if (err.message == "Request canceled") {
            return;
        }
        showLoading("No se pudo cargar la capa de informaci&oacute;n", null, "red", true);
    });
    tlayer.on("load", function () {
        showLoading("¡Listo! La capa fue agregada al mapa.", "ok", "#6BD279", true);
        var infoTemplates = {};
        for (var i = 0; i < this.layerInfos.length; i++) {
            infoTemplates[this.layerInfos[i].id] = {
                infoTemplate: new esri.InfoTemplate({ title: name })
            };
        }
        this.setInfoTemplates(infoTemplates);
        activeLayers.unshift(this.id);
    });
    map.addLayer(tlayer);
}

function downloadServicio() {
    var pos = $("#detalleServicioFormato").val();
    if (currentUser == null) {
        showLoading("Para generar descargar archivos, debes iniciar la sesi&oacute;n", null, "red", true);
        gotoLogin();
        return;
    }
    showLoading("Descargando archivo", "loading", "gold", false);
    currentUser.getIdToken().then(function (currentAccessToken) {
        var link = document.createElement('a');
        link.href = web_service + "/descargas?cmd=cobertura&tipo_descarga=" + pos + "&token=" + currentAccessToken;
        link.target = '_self';
        link.click();
    }).catch(function (_error) {
        showLoading("El archivo no se encuentra disponible para descarga", null, "red", true);
    });
}

function checkURL(url, mostrarAlerta) {
    var pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
    if (pattern.test(url)) {
        return true;
    } else {
        if (mostrarAlerta) {
            showLoading("La URL ingresada no es valida", null, "red", true);
        }
        return false;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

window.Clipboard = (function (window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function (text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);


function initMap() {
    require([
        "esri/map",
        "esri/basemaps",

        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISImageServiceLayer",
        "esri/layers/VectorTileLayer",
        "esri/layers/ImageParameters",
        "esri/layers/ImageServiceParameters",
        "esri/layers/MosaicRule",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/RasterLayer",
        "esri/layers/RasterFunction",
        "esri/layers/WMSLayer",
        "esri/layers/WFSLayer",
        "esri/layers/WebTiledLayer",
        "esri/layers/MapImageLayer",
        "esri/layers/MapImage",
        "app/geojsonlayer",

        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/CartographicLineSymbol",
        "esri/symbols/TextSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/Font",

        "esri/geometry/Point",
        "esri/geometry/Circle",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
        "esri/geometry/Extent",

        "esri/graphic",
        "esri/Color",
        "esri/InfoTemplate",
        "esri/graphicsUtils",
        "esri/renderers/jsonUtils",
        "esri/renderers/SimpleRenderer",
        "esri/units",
        "esri/TimeExtent",

        "esri/geometry/screenUtils",
        "esri/geometry/scaleUtils",
        "esri/geometry/webMercatorUtils",
        "esri/geometry/geometryEngine",
        "esri/geometry/jsonUtils",
        "esri/geometry/ScreenPoint",

        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/tasks/RelationshipQuery",
        "esri/tasks/locator",
        "esri/tasks/GeometryService",
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",

        "esri/dijit/LocateButton",
        "esri/dijit/HomeButton",
        "esri/dijit/OverviewMap",
        "esri/dijit/Scalebar",
        "esri/dijit/Legend",
        "esri/dijit/Measurement",
        "esri/dijit/Print",
        "esri/dijit/LayerSwipe",
        "esri/dijit/Basemap",
        "esri/dijit/BasemapLayer",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
        "esri/dijit/TimeSlider",

        "esri/toolbars/draw",
        "esri/toolbars/edit",

        "dojo/dom-construct",
        "dojo/dnd/Moveable",
        "esri/urlUtils",
        "moment",

        "esri/dijit/FeatureTable",
    ], function (
        __Map,
        __Basemaps,

        __ArcGISTiledMapServiceLayer,
        __ArcGISDynamicMapServiceLayer,
        __ArcGISImageServiceLayer,
        __VectorTileLayer,
        __ImageParameters,
        __ImageServiceParameters,
        __MosaicRule,
        __GraphicsLayer,
        __FeatureLayer,
        __RasterLayer,
        __RasterFunction,
        __WMSLayer,
        __WFSLayer,
        __WebTiledLayer,
        __MapImageLayer,
        __MapImage,
        __GeoJsonFeatureLayer,

        __PictureMarkerSymbol,
        __SimpleFillSymbol,
        __SimpleLineSymbol,
        __CartographicLineSymbol,
        __TextSymbol,
        __SimpleMarkerSymbol,
        __Font,

        __Point,
        __Circle,
        __Polyline,
        __Polygon,
        __Extent,

        __Graphic,
        __Color,
        __InfoTemplate,
        __graphicsUtils,
        __jsonUtilsRenderer,
        __SimpleRenderer,
        __units,
        __TimeExtent,

        __screenUtils,
        __scaleUtils,
        __webMercatorUtils,
        __geometryEngine,
        __jsonUtilsGeometry,
        __ScreenPoint,

        __Query,
        __QueryTask,
        __RelationshipQuery,
        __Locator,
        __GeometryService,
        __IdentifyTask,
        __IdentifyParameters,

        __LocateButton,
        __HomeButton,
        __OverviewMap,
        __Scalebar,
        __Legend,
        __Measurement,
        __Print,
        __LayerSwipe,
        __Basemap,
        __BasemapLayer,
        __Popup,
        __PopupTemplate,
        __TimeSlider,

        __Draw,
        __Edit,

        __domConstruct,
        __Moveable,

        __urlUtils,
        __Moment,

        __FeatureTable) {

        esri.Map = __Map;
        esri.Basemaps = __Basemaps;

        esri.ArcGISTiledMapServiceLayer = __ArcGISTiledMapServiceLayer;
        esri.ArcGISDynamicMapServiceLayer = __ArcGISDynamicMapServiceLayer;
        esri.ArcGISImageServiceLayer = __ArcGISImageServiceLayer;
        esri.VectorTileLayer = __VectorTileLayer;

        esri.ImageParameters = __ImageParameters;
        esri.ImageServiceParameters = __ImageServiceParameters,
            esri.MosaicRule = __MosaicRule,
            esri.GraphicsLayer = __GraphicsLayer;
        esri.FeatureLayer = __FeatureLayer;
        esri.RasterLayer = __RasterLayer;
        esri.RasterFunction = __RasterFunction;
        esri.WMSLayer = __WMSLayer;
        esri.WFSLayer = __WFSLayer;
        esri.WebTiledLayer = __WebTiledLayer;
        esri.MapImageLayer = __MapImageLayer;
        esri.MapImage = __MapImage;
        esri.GeoJsonFeatureLayer = __GeoJsonFeatureLayer;

        esri.PictureMarkerSymbol = __PictureMarkerSymbol;
        esri.SimpleFillSymbol = __SimpleFillSymbol;
        esri.SimpleLineSymbol = __SimpleLineSymbol;
        esri.CartographicLineSymbol = __CartographicLineSymbol;
        esri.TextSymbol = __TextSymbol;
        esri.SimpleMarkerSymbol = __SimpleMarkerSymbol;
        esri.Font = __Font;

        esri.Point = __Point;
        esri.Circle = __Circle;
        esri.Polyline = __Polyline;
        esri.Polygon = __Polygon;
        esri.Extent = __Extent;

        esri.Graphic = __Graphic;
        esri.Color = __Color;
        esri.InfoTemplate = __InfoTemplate;
        esri.graphicsUtils = __graphicsUtils;
        esri.jsonUtilsRenderer = __jsonUtilsRenderer;
        esri.SimpleRenderer = __SimpleRenderer;
        esri.units = __units;
        esri.TimeExtent = __TimeExtent;

        esri.screenUtils = __screenUtils;
        esri.scaleUtils = __scaleUtils;
        esri.webMercatorUtils = __webMercatorUtils;
        esri.geometryEngine = __geometryEngine;
        esri.jsonUtilsGeometry = __jsonUtilsGeometry;
        esri.ScreenPoint = __ScreenPoint;

        esri.Query = __Query;
        esri.QueryTask = __QueryTask;
        esri.RelationshipQuery = __RelationshipQuery;
        esri.Locator = __Locator;
        esri.GeometryService = __GeometryService;
        esri.IdentifyTask = __IdentifyTask;
        esri.IdentifyParameters = __IdentifyParameters;

        esri.LocateButton = __LocateButton;
        esri.HomeButton = __HomeButton;
        esri.OverviewMap = __OverviewMap;
        esri.Scalebar = __Scalebar;
        esri.Legend = __Legend;
        esri.Measurement = __Measurement;
        esri.Print = __Print;
        esri.LayerSwipe = __LayerSwipe;
        esri.Basemap = __Basemap;
        esri.BasemapLayer = __BasemapLayer;
        esri.Popup = __Popup;
        esri.PopupTemplate = __PopupTemplate;
        esri.TimeSlider = __TimeSlider;

        esri.Draw = __Draw;
        esri.Edit = __Edit;

        esri.domConstruct = __domConstruct;
        esri.Moveable = __Moveable;
        esri.urlUtils = __urlUtils;

        esri.FeatureTable = __FeatureTable;

        esri.config.defaults.io.proxyUrl = web_service_proxy + "/proxy.jsp";
        esri.moment = __Moment;

        setupMap();
        signIn();

    });
}

function setupMap() {

    popup = new esri.Popup({
        titleInBody: true,
        popupWindow: true
    }, esri.domConstruct.create("div"));
    popup.on("selection-change", function () {
        if ($("#descargarPop").length == 0) {

        }
        popup.setContent("Cargando...");
        if (popup.getSelectedFeature()) {
            if (popup.getSelectedFeature().getLayer().declaredClass == "esri.layers.WMSLayer") {               
            } else {
                popup.setContent(getItemtoText(popup.getSelectedFeature()));
                popup.show();
            }
        }
    });
    /*
    popup.on("clear-features", function () {
        $("#contentPopup").html("No hay elementos seleccionados");
    });
    */
    esri.basemaps.igac = {
        baseMapLayers: [
            { type: "VectorTile", url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/Mapa_base_topografico/VectorTileServer" }
        ],
        title: "Mapa Topográfico Colombia"
    };
    esri.basemaps.igachibrido = {
        baseMapLayers: [
            { url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/Mapa_Hibrido/MapServer" }
        ],
        title: "Mapa Híbrido Colombia"
    };
    esri.basemaps.igacsatelital = {
        baseMapLayers: [
            { url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/Mapa_Satelital/MapServer" }
        ],
        title: "Mapa Satelital Colombia"
    };
    esri.basemaps.igacusosuelo = {
        baseMapLayers: [
            { type: "VectorTile", url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/MapaBaseConsultaUso/VectorTileServer" }
        ],
        title: "Uso del suelo"
    };

    esri.basemaps.igacfisico = {
        baseMapLayers: [
            { url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/Mapa_Fisico_Relieve/MapServer" },
            { type: "VectorTile", url: "https://tiles.arcgis.com/tiles/RVvWzU3lgJISqdke/arcgis/rest/services/Mapa_base_fisico_vector/VectorTileServer" }
        ],
        title: "Mapa Físico Colombia"
    };

    currentBasemap = getParameterByName("b");
    if (currentBasemap != null) {

    } else {
        currentBasemap = "igac";
    }

    default_extent = new esri.Extent({
        xmin: -86.25559680664145, ymin: -4.496767298712775, xmax: -62.239483525397816, ymax: 14.437589074108095,
        spatialReference: {
            wkid: 4326
        }
    });

    var extent_param = getParameterByName("e");
    var extent_value = esri.webMercatorUtils.geographicToWebMercator(default_extent);
    if (extent_param != null) {
        try {
            extent_value = esri.webMercatorUtils.geographicToWebMercator(new esri.Extent({
                xmin: parseFloat(extent_param.split(',')[0]),
                ymin: parseFloat(extent_param.split(',')[1]),
                xmax: parseFloat(extent_param.split(',')[2]),
                ymax: parseFloat(extent_param.split(',')[3]),
                spatialReference: {
                    wkid: parseInt(extent_param.split(',')[4])
                }
            }));
            extentInicial = extent_value;
        } catch (err) {

        }
        map = new esri.Map("mapViewDiv", {
            basemap: currentBasemap,
            sliderPosition: "bottom-right",
            extent: extent_value,
            infoWindow: popup,
            maxZoom: 19,
            minZoom: 4,
            showLabels: true
        });
    } else {
        map = new esri.Map("mapViewDiv", {
            basemap: currentBasemap,
            sliderPosition: "bottom-right",
            center: default_extent.getCenter(),
            infoWindow: popup,
            maxZoom: 19,
            minZoom: 4,
            showLabels: true
        });
        map.setZoom(5);
    }

    map.on("load", function () {
    });
    map.on("click", function (event) {
        if (event.graphic != null) {

        } else {
            if (editTool.getCurrentState().graphic != null) {
                editTool.deactivate();
            }
        }
    });
    map.on("resize", function () {
        resizeCenter = map.extent.getCenter();
        setTimeout(function () {
            map.centerAt(resizeCenter);
        }, 100);
    });

    map.on("extent-change", function () {
        $("#panelLayersZoom").html(" - Zoom: " + map.getZoom());
    });
    map.on("click", function (event) {

    });

    overviewMap = new esri.OverviewMap({
        map: map,
        visible: false,
        attachTo: "bottom-left",
        height: 200,
        width: 200
    });
    overviewMap.startup();
    locateBtn = new esri.LocateButton({
        map: map,
        scale: 25000,
    }, "locateButton");
    locateBtn.startup();

    homeBtn = new esri.HomeButton({
        map: map
    }, "homeButton");
    homeBtn.startup();
    overviewMap = new esri.OverviewMap({
        map: map,
        visible: false,
        attachTo: "bottom-right",
        height: 200,
        width: 200
    });
    scalebar = new esri.Scalebar({
        map: map,
        scalebarUnit: "metric",
        attachTo: "bottom-left",
        scalebarStyle: "line"
    }, $(".esriControlsBR")[0]);

    legend = new esri.Legend({
        map: map,
        autoUpdate: false,
    }, "legendDiv");

    /* basemap */

    $("#selectBasemapPanel").on("change", function (e) {
        currentBasemap = e.target.options[e.target.selectedIndex].value;
        map.setBasemap(currentBasemap);
    });
    map.on("basemap-change", function (evt) {

        if (overviewMap.visible) {
            overviewMap.destroy();
            overviewMap = new esri.OverviewMap({
                map: map,
                visible: false,
                attachTo: "bottom-right"
            });
            overviewMap.startup();
            overviewMap.show();
        } else {
            overviewMap.destroy();
            overviewMap = new esri.OverviewMap({
                map: map,
                visible: false,
                attachTo: "bottom-right"
            });
            overviewMap.startup();
        }
    });

    map.on("extent-change", function (evt) {
    });

    map.on("zoom-end", function (evt) {
    });


    /* Coordenadas */
    hoverHandle = map.on("mouse-move", function (evt) {
        updateCoordenada(evt);
    });
    var infoTemplate = new esri.InfoTemplate();
    coordsLayer = new esri.GraphicsLayer({
        infoTemplate: infoTemplate
    });
    pointMarker = new esri.PictureMarkerSymbol("/images/map-marker.png", 32, 32);
    map.addLayer(coordsLayer);

    $("#querySearchCoordinateFormat").on("change", function (e) {
        $("#querySearchCoordinateLatitudLabel").html(sistemasCoordenadas[$("#querySearchCoordinateFormat").val()].labLat);
        $("#querySearchCoordinateLongitudLabel").html(sistemasCoordenadas[$("#querySearchCoordinateFormat").val()].labLng);
        $("#querySearchCoordinateLatitud").attr("placeholder", sistemasCoordenadas[$("#querySearchCoordinateFormat").val()].labelLat);
        $("#querySearchCoordinateLongitud").attr("placeholder", sistemasCoordenadas[$("#querySearchCoordinateFormat").val()].labelLng);
    });

    /* Imprimir */
    printer = esri.Print({
        map: map,
        url: print_service
    }, "printDiv");
    printer.on("print-complete", function (evt) {
        closeLoading();
        var link = document.createElement("a");
        link.download = "PMB-Impresion." + $("#selectPrintFormat").val();
        link.href = evt.result.url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    printer.on("error", function (_evt) {
        showLoading("No se pudo imprimir el mapa", null, "red", true);
    });
    printer.startup();


    /* Leyenda */
    legend = new esri.Legend({
        map: map,
        autoUpdate: false
    }, "leyendaDiv");
    legend.startup();

    var params = "";

    searchGraphicsLayer = new esri.GraphicsLayer({
        infoTemplate: new esri.InfoTemplate()
    });
    searchGraphicsLayer.infoTemplate = null;
    searchGraphicsLayerDetalle = new esri.GraphicsLayer({
        infoTemplate: new esri.InfoTemplate()
    });
    searchGraphicsLayerDetalle.infoTemplate = null;

    searchImageLayer = new esri.MapImageLayer();
    searchImageLayerDetalle = new esri.MapImageLayer();

    searchGraphicsLayer.setVisibility(true);
    searchGraphicsLayerDetalle.setVisibility(false);
    searchImageSwipeDetalle = new esri.LayerSwipe({
        type: "vertical",
        map: map,
        layers: [searchImageLayerDetalle],
        enabled: false
    }, "swipeDiv");
    searchImageSwipeDetalle.startup();

    map.addLayer(searchGraphicsLayer);
    map.addLayer(searchGraphicsLayerDetalle);

    swipeLayer = new esri.MapImageLayer();
    map.addLayer(swipeLayer);
    swipeWidget = new esri.LayerSwipe({
        type: "vertical",
        map: map,
        layers: [swipeLayer],
        enabled: false
    }, "swipe2Div");
    swipeWidget.startup();

    /*
    if (getParameterByName("imagen") != null) {
        params = params + "&imagen=" + getParameterByName("imagen");
    }
    */
    if (getParameterByName("u") != null) {
        params = params + "&unidad=" + getParameterByName("u");
    }

    /* Search */
    searchImagenSymbol = new esri.SimpleFillSymbol(
        esri.SimpleFillSymbol.STYLE_SOLID,
        new esri.SimpleLineSymbol(
            esri.SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([255, 0, 0, 0.5]),
            2
        ),
        new esri.Color([255, 0, 0, 0])
    );
    searchCoberturaSymbol = new esri.SimpleFillSymbol(
        esri.SimpleFillSymbol.STYLE_SOLID,
        new esri.SimpleLineSymbol(
            esri.SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([0, 0, 0, 0.5]),
            4
        ),
        new esri.Color([0, 0, 0, 0])
    );
    searchImagenActiveSymbol = new esri.SimpleFillSymbol(
        esri.SimpleFillSymbol.STYLE_SOLID,
        new esri.SimpleLineSymbol(
            esri.SimpleLineSymbol.STYLE_SOLID,
            new esri.Color([64, 147, 208, 0.5]),
            2
        ),
        new esri.Color([64, 147, 208, 0])
    );

    /* Area/GeoJSON */
    areaLayer = new esri.GraphicsLayer({
        id: "Area"
    });
    areaLayer.setVisibility(false);
    areaLayer.on("click", function (evt) {
        if (evt.graphic != null) {
            editTool.activate(esri.Edit.MOVE | esri.Edit.EDIT_VERTICES | esri.Edit.SCALE | esri.Edit.ROTATE, evt.graphic, {
                allowAddVertices: true,
                allowDeleteVertices: true,
                uniformScaling: true
            });
        }
    });
    $("html").keyup(function (e) {
        if (e.keyCode == 46) {
            if (editTool.getCurrentState().graphic != null) {
                if (modoSearch == "area") {
                    areaLayer.remove(editTool.getCurrentState().graphic);
                    editTool.deactivate();
                }
            }
        }
    });
    drawTool2 = new esri.Draw(map);
    drawTool2.on("draw-end", function (evt) {
        map.enableMapNavigation();
        drawTool2.deactivate();

        var cLineDef = esri.Color.fromArray([255, 0, 0, 1.0]);
        var cFillDef = esri.Color.fromArray([255, 0, 0, 0.5]);
        var symbol = new esri.SimpleFillSymbol(esri.SimpleLineSymbol.STYLE_SOLID,
            new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2),
            cFillDef);

        var g = new esri.Graphic(evt.geometry, symbol);
        areaLayer.clear();
        areaLayer.add(g);
        map.setExtent(esri.graphicsUtils.graphicsExtent(areaLayer.graphics).expand(2));
        editTool2.deactivate();
    });
    drawTool2.deactivate();
    editTool2 = new esri.Edit(map, {
        textSymbolEditorHolder: "txtSymbolEditorHolder"
    });
    editTool2.on("activate", function (evt) {
        var cLineDef = esri.Color.fromArray([255, 0, 0, 1.0]);
        var cFillDef = esri.Color.fromArray([255, 0, 0, 0.5]);
        if (editTool2.getCurrentState().graphic.symbol.type == "simplefillsymbol") {
            editTool2.getCurrentState().graphic.setSymbol(new esri.SimpleFillSymbol(esri.SimpleLineSymbol.STYLE_SOLID,
                new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2),
                cFillDef));
        }
    });
    editTool2.deactivate();
    map.addLayer(areaLayer);
    fileLayer = new esri.GraphicsLayer({
        id: "File"
    });
    fileLayer.setVisibility(false);
    map.addLayer(fileLayer);

    $("#file").change(function (e) {
        var files = $('#file')[0].files;
        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataJSON = Terraformer.ArcGIS.fromGeoJSON(JSON.parse(e.target.result));
                var cLineDef = esri.Color.fromArray([255, 0, 0, 1.0]);
                var cFillDef = esri.Color.fromArray([255, 0, 0, 0.5]);
                var symbol = new esri.SimpleFillSymbol(esri.SimpleLineSymbol.STYLE_SOLID,
                    new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2),
                    cFillDef);

                for (var i = 0; i < dataJSON.length; i++) {
                    var _geometry = esri.webMercatorUtils.geographicToWebMercator(esri.jsonUtilsGeometry.fromJson(dataJSON[i].geometry));
                    var g = new esri.Graphic(_geometry, symbol);
                    fileLayer.add(g);
                }
                map.setExtent(esri.graphicsUtils.graphicsExtent(fileLayer.graphics).expand(2));
            };
            reader.readAsText(files[i]);
        }
    });

    /* Dibujar */
    dibujoLayer = new esri.GraphicsLayer({
        id: "Dibujo",
        infoTemplate: new esri.InfoTemplate({ title: "Dibujo" })
    });
    map.addLayer(dibujoLayer);
    dibujoLayer.on("click", function (evt) {
        if ($("#panelDibujar").is(":visible")) {
            if (evt.graphic != null) {
                editTool.activate(esri.Edit.MOVE | esri.Edit.EDIT_VERTICES | esri.Edit.SCALE | esri.Edit.ROTATE, evt.graphic, {
                    allowAddVertices: true,
                    allowDeleteVertices: true,
                    uniformScaling: true
                });
            } else {
                if (editToolState) {
                    editTool.deactivate();
                    $("#drawEdit").hide();
                }
            }
        }
    });
    drawTool = new esri.Draw(map);
    drawTool.on("draw-end", function (evt) {
        map.enableMapNavigation();
        drawTool.deactivate();

        var symbol = null;

        var cLine = esri.Color.fromString($("#drawOptLineColorInput").val()).toRgba();
        var cFill = esri.Color.fromString($("#drawOptFillColorInput").val()).toRgba();

        var cLineDef = esri.Color.fromArray(cLine);
        var cFillDef = esri.Color.fromArray(cFill);

        if (activeTool == "text") {
            symbol = new esri.TextSymbol($("#drawText").val(), new esri.Font("100%"), cFillDef);
        }
        if (activeTool == "point" || activeTool == "multipoint") {
            symbol = pointMarker;
        }
        if (activeTool == "line" || activeTool == "polyline" || activeTool == "freehandpolyline") {
            symbol = new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2);
        }
        if (symbol == null) {
            symbol = new esri.SimpleFillSymbol(esri.SimpleLineSymbol.STYLE_SOLID,
                new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, cLineDef, 2),
                cFillDef);
        }

        var g = new esri.Graphic(evt.geometry, symbol);
        dibujoLayer.add(g);
        editTool.activate(esri.Edit.MOVE | esri.Edit.EDIT_VERTICES | esri.Edit.SCALE | esri.Edit.ROTATE, g, {
            allowAddVertices: true,
            allowDeleteVertices: true,
            uniformScaling: true
        });
    });
    drawTool.deactivate();
    editTool = new esri.Edit(map, {
        textSymbolEditorHolder: "txtSymbolEditorHolder"
    });
    editTool.on("activate", function (evt) {
        $("#drawEdit").show();
        $("#drawIntro").hide();
        $("#drawOptsFill").hide();
        $("#drawOptsText").hide();
        $("#drawOptsLine").hide();

        updateLock = true;
        if (evt.graphic.symbol.type == "textsymbol") {
            $("#drawOptsText").show();
            $("#drawText").val(evt.graphic.symbol.text);
            $("#drawOptsFill").show();
            $("#drawOptFillColor").colorpicker("setValue", evt.graphic.symbol.color.toString());
        }
        if (evt.graphic.symbol.type == "simplelinesymbol") {
            $("#drawOptsLine").show();
            $("#drawOptLineColor").colorpicker("setValue", evt.graphic.symbol.color.toString());
        }
        if (evt.graphic.symbol.type == "simplefillsymbol") {
            try {
                $("#drawOptsFill").show();
                $("#drawOptFillColor").colorpicker("setValue", evt.graphic.symbol.color.toString());
                $("#drawOptsLine").show();
                $("#drawOptLineColor").colorpicker("setValue", evt.graphic.symbol.outline.color.toString());
            } catch (err) { }
        }
        updateLock = false;
        updateEditGraphic();
        updateEditMeasure(evt.graphic);
    });
    editTool.on("graphic-move", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("graphic-move-stop", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("rotate", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("rotate-stop", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("scale", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("scale-stop", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("vertex-add", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("vertex-delete", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("vertex-move", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("vertex-move-stop", function (evt) {
        updateEditMeasure(evt.graphic);
    });
    editTool.on("deactivate", function (_evt) {
        $("#drawEdit").hide();
    });
    editTool.deactivate();

    $("#drawOptLineColor").colorpicker({}).on('changeColor', function (e) {
        $("#drawOptLineColorInput").val(e.color);
        $("#drawOptLineColor").css("color", e.color);
        if ((editTool.getCurrentState().tool != 0) && (!updateLock)) {
            updateEditGraphic();
        }
    });
    $("#drawOptFillColor").colorpicker({}).on('changeColor', function (e) {
        $("#drawOptFillColorInput").val(e.color);
        $("#drawOptFillColor").css("color", e.color);
        if ((editTool.getCurrentState().tool != 0) && (!updateLock)) {
            updateEditGraphic();
        }
    });

    $("#drawText").on("change keyup paste", function (_e) {
        if (editTool.getCurrentState().tool != 0) {
            updateEditGraphic();
        }
    });
    $("#measureAreaUnit").on("change", function (_e) {
        updateEditMeasure();
    });
    $("#measureLengthUnit").on("change", function (_e) {
        updateEditMeasure();
    });

    /* Imagenes */
    searchImageLayer.setVisibility(true);
    searchImageLayerDetalle.setVisibility(true);
    map.addLayer(searchImageLayer);
    map.addLayer(searchImageLayerDetalle);

    $("#detalleImagenOpacity")
        .colorpicker({
            horizontal: true,
            customClass: "customPicker",
            color: "#000000FF",
            template: "<div class='colorpicker dropdown-menu'>" +
                "<div class='colorpicker-saturation'><i><b></b></i></div>" +
                "<div class='colorpicker-hue'><i></i></div>" +
                "<div class='colorpicker-alpha'><i></i></div>" +
                "<div class='colorpicker-text' data-layer-color='imagen'></div>" +
                "<div class='colorpicker-color'><div /></div>" +
                "</div>"
        })
        .on('changeColor', function (e) {
            if (currentMode == "media") {
                previewLayer.setOpacity(e.color.getValue().a);
                $(".colorpicker-text[data-layer-color='imagen']").html((e.color.getValue().a * 100).toFixed(0) + "%");
            }
            if (currentMode == "alta") {
                searchImageLayerDetalle.setOpacity(e.color.getValue().a);
                $(".colorpicker-text[data-layer-color='imagen']").html((e.color.getValue().a * 100).toFixed(0) + "%");
            }
        })
        .on('showPicker', function (e) {
            if (currentMode == "media") {
                $(this).colorpicker("setValue", "rgba(0, 0, 0, " + previewLayer.opacity + ")");
                $(".colorpicker-text[data-layer-color='imagen']").html((previewLayer.opacity * 100).toFixed(0) + "%");
            }
            if (currentMode == "alta") {
                $(this).colorpicker("setValue", "rgba(0, 0, 0, " + searchImageLayerDetalle.opacity + ")");
                $(".colorpicker-text[data-layer-color='imagen']").html((searchImageLayerDetalle.opacity * 100).toFixed(0) + "%");
            }
        });


    new esri.Moveable("panelLayers", { handle: "headingLeyenda" });
    new esri.Moveable("panelLeyenda", { handle: "headingLeyenda" });
    new esri.Moveable("panelImprimir", { handle: "headingImprimir" });
    new esri.Moveable("panelTiempo", { handle: "headingTiempo" });
    new esri.Moveable("panelLogin", { handle: "headingLogin" });

}

function getDataLocal() {
    $.ajax({
        url: "cache/config.json",
        type: 'GET',
        success: function (data) {
            initData(data);
        },
        error: function (_data) {

        }
    });
}

function initData(data) {
    cacheUnidades = data.UNIDAD;
    cacheMosaicos = data.MOSAICOS;
    cacheTematicas = data.TEMATICA;
    cacheEntidades = data.ENTIDAD;
    cacheUnidadesFiltro = data.UNIDAD;

    for (var i = 0; i < cacheUnidadesFiltro.length; i++) {
        if (cacheUnidadesFiltro[i].type == "DEPTO") {
            cacheUnidadesFiltro[i].disabled = true;
        }
    }

    $("#searchFiltro").select2({
        data: cacheUnidadesFiltro,
        multiple: false,
        placeholder: "Ej: Colombia",
        query: function (query) {
            if ((query.term == null) || (query.term == "")) {
                query.callback({ results: cacheUnidadesFiltro });
            } else {
                var results = [];
                for (var i = 0; i < cacheUnidadesFiltro.length; i++) {
                    if (limpiarTexto(cacheUnidadesFiltro[i].text).indexOf(limpiarTexto(query.term)) != -1) {
                        if (cacheUnidadesFiltro[i].type == "MUNI") {
                            results.push({
                                type: cacheUnidadesFiltro[i].type,
                                id: cacheUnidadesFiltro[i].id,
                                text: cacheUnidadesFiltro[i].text + ", " + getDeptoByMuni(cacheUnidadesFiltro[i].id).text
                            });
                        }
                        if (cacheUnidadesFiltro[i].type == "DEPTO") {
                            results.push({
                                type: cacheUnidadesFiltro[i].type,
                                id: cacheUnidadesFiltro[i].id,
                                text: cacheUnidadesFiltro[i].text,
                                disabled: true
                            });
                        }
                        if (cacheUnidadesFiltro[i].type == "PAIS") {
                            results.push({
                                type: cacheUnidadesFiltro[i].type,
                                id: cacheUnidadesFiltro[i].id,
                                text: cacheUnidadesFiltro[i].text
                            });
                        }
                    }
                }
                query.callback({ results: results });
            }
        },
        templateResult: function (data) {
            if (!data.type) {
                return data.text;
            }
            return $("<span class='" + data.type + "'>" + data.text + "</span>");
        }
    });
    $("#searchFiltro").val(null);
    $("#searchFiltro").trigger("change");
    $("#searchFiltro").on("change", function (e) {

        var data = $("#searchFiltro").select2("data")[0];
        if (data.type == "MUNI") {
            $("#limpiarBtn").show();
            var params = {};
            params.tipo = data.type;
            params.codigo = data.id;
            $.ajax({
                url: web_service + "/unidad?cmd=query_codigo",
                data: params,
                type: 'POST',
                success: function (data) {
                    if (data.status) {
                        searchCurrent = esri.jsonUtilsGeometry.fromJson(Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(data.SHAPE))));
                        updateInicio();
                    } else {
                        showLoading("Ha ocurrido un error, consultando la unidad selecccionada.", null, "red", true);
                        $("#panelSearchNivel1").hide();
                        $("#searchBar").hide();
                        $("#searchBarTab").hide();
                    }
                },
                error: function (_data) {
                    showLoading("Ha ocurrido un error, consultando la unidad selecccionada.", null, "red", true);
                    $("#panelSearchNivel1").hide();
                    $("#searchBar").hide();
                    $("#searchBarTab").hide();
                }
            });
        }
        if (data.type == "DEPTO") {
            $("#limpiarBtn").show();
            var params = {};
            params.tipo = data.type;
            params.codigo = data.id;
            $.ajax({
                url: web_service + "/unidad?cmd=query_codigo",
                data: params,
                type: 'POST',
                success: function (data) {
                    if (data.status) {
                        searchCurrent = esri.jsonUtilsGeometry.fromJson(Terraformer.ArcGIS.convert(new Terraformer.Primitive(JSON.parse(data.SHAPE))));
                        updateInicio();
                    } else {
                        showLoading("Ha ocurrido un error, consultando la unidad selecccionada.", null, "red", true);
                        $("#panelSearchNivel1").hide();
                        $("#searchBar").hide();
                        $("#searchBarTab").hide();
                    }
                },
                error: function (_data) {
                    showLoading("Ha ocurrido un error, consultando la unidad selecccionada.", null, "red", true);
                    $("#panelSearchNivel1").hide();
                    $("#searchBar").hide();
                    $("#searchBarTab").hide();
                }
            });
        }
        if (data.type == "PAIS") {
            $("#limpiarBtn").show();
            searchCurrent = esri.Polygon.fromExtent(default_extent);
            updateInicio();
        }

    });

    $("#searchImagenesFechaInicial").datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        orientation: "bottom"
    });
    /*
    $("#searchImagenesFechaInicial").on("change", function (e) {
        tableSearchBni.ajax.reload();
    });
    */
    $("#searchImagenesFechaFinal").datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        orientation: "bottom"
    });
    /*
    $("#searchImagenesFechaFinal").on("change", function (e) {
        tableSearchBni.ajax.reload();
    });
    */
    var dataMosaicos = [];
    var dataMosaicosYear = [];
    var dataMosaicosYear2 = [];
    dataMosaicosYear.push({ id: "", text: "Ninguna" });
    for (var i = 0; i < cacheMosaicos.length; i++) {
        dataMosaicos.push({ id: cacheMosaicos[i].id, text: cacheMosaicos[i].name });
        var y = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
        if (dataMosaicosYear2.indexOf(y) == -1) {
            dataMosaicosYear.push({ id: y, text: y });
            dataMosaicosYear2.push(y);
        }
    }
    $("#selectTile1YPanel").select2({
        data: dataMosaicosYear
    });
    $("#selectTile1MPanel").select2({
        data: []
    });
    $("#selectTile1YPanel").on("change", function (e) {        
        if (!($("#selectTile1YPanel").val() == "")) {
            var dataMosaicosMonth = [];
            dataMosaicosMonth.push({ id: "", text: "Ninguna" });
            for (var i = 0; i < cacheMosaicos.length; i++) {
                var y = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
                var m = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(4).replace("_", "");
                if (y == $("#selectTile1YPanel").val()) {
                    dataMosaicosMonth.push({ id: m, text: getTextMonth(m) });
                }
            }
            $("#selectTile1MPanel").select2("destroy").empty().select2({ data: dataMosaicosMonth });
        } else {
            $("#selectTile1MPanel").select2("destroy").empty().select2({ data: [] });
        }
        updateTiempo();
    });
    $("#selectTile1MPanel").on("change", function (e) {
        updateTiempo();
    });

    $("#selectTile2YPanel").select2({
        data: dataMosaicosYear
    });
    $("#selectTile2MPanel").select2({
        data: []
    });
    $("#selectTile2YPanel").on("change", function (e) {
        if (!($("#selectTile2YPanel").val() == "")) {
            var dataMosaicosMonth = [];
            dataMosaicosMonth.push({ id: "", text: "Ninguna" });
            for (var i = 0; i < cacheMosaicos.length; i++) {
                var y = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
                var m = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(4).replace("_", "");
                if (y == $("#selectTile2YPanel").val()) {
                    dataMosaicosMonth.push({ id: m, text: getTextMonth(m) });
                }
            }
            $("#selectTile2MPanel").select2("destroy").empty().select2({ data: dataMosaicosMonth });
        } else {
            $("#selectTile2MPanel").select2("destroy").empty().select2({ data: [] });
        }
        updateTiempo();
    });
    $("#selectTile2MPanel").on("change", function (e) {
        updateTiempo();
    });

    $("#selectTile3YPanel").select2({
        data: dataMosaicosYear
    });
    $("#selectTile3MPanel").select2({
        data: []
    });
    $("#selectTile3YPanel").on("change", function (e) {
        if (!($("#selectTile3YPanel").val() == "")) {
            var dataMosaicosMonth = [];
            dataMosaicosMonth.push({ id: "", text: "Ninguna" });
            for (var i = 0; i < cacheMosaicos.length; i++) {
                var y = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
                var m = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(4).replace("_", "");
                if (y == $("#selectTile3YPanel").val()) {
                    dataMosaicosMonth.push({ id: cacheMosaicos[i].name, text: getTextMonth(m) });
                }
            }
            $("#selectTile3MPanel").select2("destroy").empty().select2({ data: dataMosaicosMonth });
        } else {
            $("#selectTile3MPanel").select2("destroy").empty().select2({ data: [] });
        }
        updateVideoFrame();
    });
    $("#selectTile3MPanel").on("change", function (e) {
        updateVideoFrame();
    });
    videoLogo1 = new window.Image();
    videoLogo1.src = "/images/LogoVideo1.png";
    videoLogo2 = new window.Image();
    videoLogo2.src = "/images/LogoVideo2.png";
    $("#panelSearch").show();

    if (getParameterByName("u") != null) {
        var unidad = getUnidadById(getParameterByName("u"));
        currentCaracterizacion = data.UNIDAD_INICIAL;
        firstExpand = false;
        $("#panelSearchResultados").show();
        $("#headingSearch").show();
        toggleMenu("large");        
        $("#searchFiltro").val(getParameterByName("u"));
        $("#searchFiltro").trigger("change");
    }
    if ((getParameterByName("u") == null) && (getParameterByName("a") == null)) {
        $("#searchFiltro").val(0);
        $("#searchFiltro").trigger("change");
    }

}

function getTextMonth(m) {
    if (m.startsWith("01")) {
        return "Enero";
    }
    if (m.startsWith("02")) {
        return "Febrero";
    }
    if (m.startsWith("03")) {
        return "Marzo";
    }
    if (m.startsWith("04")) {
        return "Abril";
    }
    if (m.startsWith("05")) {
        return "Mayo";
    }
    if (m.startsWith("06")) {
        return "Junio";
    }
    if (m.startsWith("07")) {
        return "Julio";
    }
    if (m.startsWith("08")) {
        return "Agosto";
    }
    if (m.startsWith("09")) {
        return "Septiembre";
    }
    if (m.startsWith("10")) {
        return "Octubre";
    }
    if (m.startsWith("11")) {
        return "Noviembre";
    }
    if (m.startsWith("12")) {
        return "Diciembre";
    }
    if (m.startsWith("q1")) {
        return "Enero-Marzo";
    }
    if (m.startsWith("q2")) {
        return "Abril-Junio";
    }
    if (m.startsWith("q3")) {
        return "Julio-Septiembre";
    }
    if (m.startsWith("q4")) {
        return "Octubre-Diciembre";
    }

}

function downloadImagen() {
    if (currentUser == null) {
        showLoading("Para generar descargar archivos, debes iniciar la sesi&oacute;n", null, "red", true);
        gotoLogin();
        return;
    }
    if (currentMode == "alta") {
        if (cachePermisos.indexOf("IMAGENES_ALTA") == -1) {
            $("#modalLicencia2").modal({ backdrop: 'static', keyboard: false }, "show");
            $("#licenciaNombre2").val(currentImagen.IMAGEN_ID);
            return;
        }
    }
    showLoading("Descargando archivo", "loading", "gold", false);
    currentUser.getIdToken().then(function (currentAccessToken) {
        $.ajax({
            //url: web_service + "/descargas?cmd=request&tipo=" + $("#detalleImagenDescargaFormato").val() + "&id=" + currentImagen.ID_IMAGEN + "&token=" + currentAccessToken,
            url: web_service + "/descargas?cmd=request&tipo=imagen_alta&id=" + currentImagen.ID_IMAGEN + "&token=" + currentAccessToken,
            success: function (data) {
                if (data.status) {
                    closeLoading();
                    var link = document.createElement('a');
                    link.href = web_service + "/descargas?cmd=download&token=" + data.token;
                    link.target = '_self';
                    link.click();
                } else {
                    if (data.msg != null) {
                        showLoading(data.msg, null, "red", true);
                    } else {
                        showLoading("El archivo no se encuentra disponible para descarga", null, "red", true);
                    }
                }
            },
            error: function (_data) {
                showLoading("El archivo no se encuentra disponible para descarga", null, "red", true);
            }
        });
    }).catch(function (_error) {
        showLoading("El archivo no se encuentra disponible para descarga", null, "red", true);
    });
}

function aplicarFiltro() {
    if (currentMode == "media") {
        tableSearchBni.ajax.reload();
    }
    if (currentMode == "alta") {
        tableSearchBni2.ajax.reload();
    }
}

function modoDibujo2(tool) {
    editTool2.deactivate();
    map.disableMapNavigation();
    drawTool2.activate(tool);
}

function limpiarMain() {
    if (modoSearch == "entidad") {
        $("#searchFiltro").val(0);
        $("#searchFiltro").trigger("change");
    }
    if (modoSearch == "area") {
        areaLayer.clear();
    }
    if (modoSearch == "geojson") {
        fileLayer.clear();
    }
    aplicarFiltro();
    map.setExtent(default_extent);
}

function updateInicio() {
    if (firstExpand) {
        $("#panelSearchResultados").show();
        $("#headingSearch").show();
        toggleMenu("large");
        if (extentInicial == null) {
            if (searchCurrent != null) {
                if ($("#searchFiltro").select2("data")[0].type == "PAIS") {
                    map.setExtent(default_extent);
                } else {
                    map.setExtent(searchCurrent.getExtent().expand(1.5));
                }
            }
        }
        extentInicial = null;
        updateImagenes();
        firstExpand = false;
    } else {
        if (extentInicial == null) {
            if (searchCurrent != null) {
                if ($("#searchFiltro").select2("data")[0].type == "PAIS") {
                    map.setExtent(default_extent);
                } else {
                    map.setExtent(searchCurrent.getExtent().expand(1.5));
                }
            }
        }
        extentInicial = null;
    }
}

function gotoVideo() {
    currentScreen = "Video";
    reporteUso("Abrir video");
    minAll();
    toggleMenu("small");
    loading = $.confirm({
        title: "",
        content: "<div style='text-align: center;'><img src='/images/ig124.gif' style='height: 200px;width: 200px;'></div>",
        buttons: {},
        closeIcon: true,
        lazyOpen: true,
        onContentReady: function () {

        },
        onOpenBefore: function () {
            loading.buttons.ok.hide();
            loading.buttons.close.hide();
        }
    });
    loading.open();
    setTimeout(function () {
        loading.close();
        $("#modalVideo").modal({ backdrop: 'static', keyboard: false }, "show");
        videoSlide = [];
        cYmin = Math.min(lat2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).ymin, map.getZoom() + 2),
            lat2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).ymax, map.getZoom() + 2));
        cYmax = Math.max(lat2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).ymin, map.getZoom() + 2),
            lat2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).ymax, map.getZoom() + 2));
        cXmin = Math.min(lon2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).xmin, map.getZoom() + 2),
            lon2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).xmax, map.getZoom() + 2));
        cXmax = Math.max(lon2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).xmin, map.getZoom() + 2),
            lon2tile(esri.webMercatorUtils.webMercatorToGeographic(map.extent).xmax, map.getZoom() + 2));
        cSizeX = (cXmax - cXmin) * 256;
        cSizeY = (cYmax - cYmin) * 256;
        $("#frameCanvas").attr("width", cSizeX);
        $("#frameCanvas").attr("height", cSizeY);
        $("#videoCanvas").attr("width", cSizeX);
        $("#videoCanvas").attr("height", cSizeY);
        addVideoSlide();
    }, 3000);    

}

function closeVideo() {
    $("#modalVideo").modal("hide");
}

function addVideoSlide() {
    var canvas = document.querySelector("#frameCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cSizeX, cSizeY);
    var img = new window.Image();
    img.src = canvas.toDataURL("image/png");
    videoSlide.push({
        time: null, duration: 5, img: img.src, imgObj: img });    
    gotoVideoSlide(videoSlide.length - 1);
}

function updateVideoPager() {
    var strHTML = "";
    for (var i = 0; i < videoSlide.length; i++) {
        if (i == currentSlide) {
            strHTML = strHTML + "<li class='active'><a href='#' onclick='gotoVideoSlide(" + i + ");'>" + (i + 1) + "</a></li>";
        } else {
            strHTML = strHTML + "<li><a href='#' onclick='gotoVideoSlide(" + i + ");'>" + (i + 1) + "</a></li>";
        }
    }
    strHTML = strHTML + "<li><a href='#' onclick='addVideoSlide();'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span></a></li>";
    $("#videoPager").html(strHTML);
}

function gotoVideoSlide(pos) {
    currentSlide = pos;
    $("#videoSlide").attr("src", videoSlide[currentSlide].img);
    if (videoSlide[currentSlide].time != null) {
        var y = videoSlide[currentSlide].time.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
        $("#selectTile3YPanel").val(y);
        var dataMosaicosMonth = [];
        dataMosaicosMonth.push({ id: "", text: "Ninguna" });
        for (var i = 0; i < cacheMosaicos.length; i++) {
            var m = cacheMosaicos[i].name.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(4).replace("_", "");
            if (y == $("#selectTile3YPanel").val()) {
                dataMosaicosMonth.push({ id: cacheMosaicos[i].name, text: getTextMonth(m) });
            }
        }
        $("#selectTile3MPanel").select2("destroy").empty().select2({ data: dataMosaicosMonth });
        $("#selectTile3MPanel").val(videoSlide[currentSlide].time);
    } else {
        $("#selectTile3YPanel").val(null);
        $("#selectTile3MPanel").val(null);
    }
    $("#selectTile3YPanel").trigger("change.select2");
    $("#selectTile3MPanel").trigger("change.select2");
    updateVideoPager();
}

function updateVideoFrame() {
    if (($("#selectTile3MPanel").val() == "") || ($("#selectTile3MPanel").val() == null)) {
        var canvas = document.querySelector("#frameCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cSizeX, cSizeY);
        var img = new window.Image();
        img.src = canvas.toDataURL("image/png");
        videoSlide[currentSlide].time = null;
        videoSlide[currentSlide].img = img.src;
        videoSlide[currentSlide].imgObj = img;
        $("#videoSlide").attr("src", videoSlide[currentSlide].img);
        return;
    }
    loading = $.confirm({
        title: "",
        content: "<div style='text-align: center;'><img src='/images/ig124.gif' style='height: 200px;width: 200px;'></div>",
        buttons: {},
        closeIcon: true,
        lazyOpen: true,
        onContentReady: function () {

        },
        onOpenBefore: function () {
            loading.buttons.ok.hide();
            loading.buttons.close.hide();
        }
    });
    loading.open();
    cX = cXmin;
    cY = cYmin;
    videoSlide[currentSlide].time = $("#selectTile3MPanel").val();
    canvasVideo = document.querySelector("#videoCanvas");
    ctxVideo = canvasVideo.getContext("2d");
    getVideoFrame();
}

function getVideoFrame() {
    if (cY > cYmax) {        
        ctxVideo.drawImage(videoLogo2, 0, 0, 350, 100, 20, 20, 350, 100);
        ctxVideo.drawImage(videoLogo1, 0, 0, 167, 100, cSizeX - 167, 20, 167, 100);                  
        var y = videoSlide[currentSlide].time.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(0, 4);
        var m = videoSlide[currentSlide].time.replaceAll("global_", "").replaceAll("monthly_", "").replaceAll("quarterly_", "").replaceAll("_mosaic", "").substr(4).replace("_", "");
        ctxVideo.save();
        ctxVideo.font = "64px arial";
        ctxVideo.strokeStyle = "black";
        ctxVideo.lineWidth = 8;
        ctxVideo.lineJoin = "round";
        ctxVideo.miterLimit = 2;
        ctxVideo.strokeText(getTextMonth(m) + " " + y, 20, cSizeY - 30);        
        ctxVideo.fillStyle = "white";
        ctxVideo.fillText(getTextMonth(m) + " " + y, 20, cSizeY - 30);
        ctxVideo.restore();
        var img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = canvasVideo.toDataURL("image/png");
        videoSlide[currentSlide].img = img.src;
        videoSlide[currentSlide].imgObj = img;
        $("#videoSlide").attr("src", videoSlide[currentSlide].img);
        loading.close();
        return;
    }
    imgLoad = new window.Image();
    imgLoad.crossOrigin = "anonymous";
    imgLoad.onload = function () {
        var xpos = cX - cXmin;
        var ypos = cY - cYmin;
        ctxVideo.drawImage(imgLoad, 0, 0, 256, 256, xpos * 256, ypos * 256, 256, 256);
        if (cX > cXmax) {
            cY = cY + 1;
            cX = cXmin;
        } else {
            cX = cX + 1;
        }
        getVideoFrame();
    };
    imgLoad.src = web_service + "/imagenes2?cmd=tile&ID=" + videoSlide[currentSlide].time + "&Z=" + (map.getZoom() + 2) + "&X=" + cX + "&Y=" + cY + "&token=" + currentAccessToken;
}

function generarVideo() {
    loading = $.confirm({
        title: "",
        content: "<div style='text-align: center;'><img src='/images/ig124.gif' style='height: 200px;width: 200px;'></div>",
        buttons: {},
        closeIcon: true,
        lazyOpen: true,
        onContentReady: function () {

        },
        onOpenBefore: function () {
            loading.buttons.ok.hide();
            loading.buttons.close.hide();
        }
    });
    loading.open();

    canvasVideo = document.querySelector("#videoCanvas");
    ctxVideo = canvasVideo.getContext("2d");
    var videoStream = canvasVideo.captureStream(30);
    mediaRecorder = new MediaRecorder(videoStream);

    chunks = [];
    cVideoFrame = 0;
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };

    mediaRecorder.onstop = function (e) {
        var blob = new Blob(chunks, { 'type': 'video/mp4' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = videoURL;
        link.target = '_blank';
        link.click();
        loading.close();
    };
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };
    mediaRecorder.start();
    nextVideoFrame();
}

function nextVideoFrame() {
    if (cVideoFrame == videoSlide.length) {
        mediaRecorder.stop();
        return;
    }
    gotoVideoSlide(cVideoFrame);
    ctxVideo.drawImage(videoSlide[cVideoFrame].imgObj, 0, 0);
    cVideoFrame = cVideoFrame + 1;
    setTimeout(nextVideoFrame, 5000);
}

function deleteVideoSlide() {    
    videoSlide.splice(currentSlide, 1);
    if (videoSlide.length == 0) {
        addVideoSlide();
    } else {
        gotoVideoSlide(0);
    }
}

function getSorted(selector, attrName) {
    return $($(selector).toArray().sort(function (a, b) {
        var aVal = a.getAttribute(attrName),
            bVal = b.getAttribute(attrName);
        return (aVal > bVal) ? 1 : -1;
    }));
}

function getItemtoText(feature) {
    var sHTML = "";
    var _layer;
    var objectidc;
    try {
        _layer = feature.getLayer();
    } catch (err) {

    }
    if (feature.attributes == null) {
        if (feature.properties != null) {
            feature.attributes = feature.properties;
        }
    }
    for (var key in feature.attributes) {
        if ((feature.attributes[key] !== null && feature.attributes[key] !== "") &&
            (feature.attributes.hasOwnProperty(key))) {
            var found = false;

            if (key.toLowerCase() == "globalid") {
                continue;
            }
            if (key.toLowerCase() == "objectid") {
                objectidc = feature.attributes[key];
                continue;
            }
            if (key.toLowerCase().startsWith("shape")) {
                continue;
            }

            if (_layer != null) {
                if (_layer.fields != null) {
                    for (var i = 0; i < _layer.fields.length; i++) {
                        if (key == _layer.fields[i].name) {
                            found = true;

                            var isDate = _layer.fields[i].type == "esriFieldTypeDate" ? true : false;
                            var isCurrency = _layer.fields[i].description == "currency" ? true : false;
                            var isNumber = _layer.fields[i].type == "esriFieldTypeDouble" ? true : false;
                            var isString = _layer.fields[i].type == "esriFieldTypeString" ? true : false;
                            var dateField = '',
                                numberField = '';

                            if (isDate) {
                                dateField = getDateText(feature.attributes[key].toString());
                            } else if (isCurrency) {
                                numberField = feature.attributes[key].toFixed(2);
                            } else if (isNumber) {
                                numberField = feature.attributes[key].toString();
                            }

                            if (_layer.fields[i].alias != null) {
                                sHTML = sHTML + "<b>" + _layer.fields[i].alias + ": </b>";
                            } else {
                                sHTML = sHTML + "<b>" + key + ": </b>";
                            }
                            if (feature.attributes.hasOwnProperty(key)) {
                                if (_layer.typeIdField == key) {
                                    for (var j = 0; j < _layer.types.length; j++) {
                                        if (feature.attributes[key] == _layer.types[j].id) {
                                            sHTML = sHTML + _layer.types[j].name + "<br />";
                                        }
                                    }
                                } else {
                                    if (_layer.fields[i].domain != null) {
                                        sHTML = sHTML + _layer.fields[i].domain.getName(feature.attributes[key]) + "<br />";
                                    } else {
                                        if (isDate) {
                                            sHTML = sHTML + dateField + "<br />";
                                        } else if (isNumber) {
                                            sHTML = sHTML + numberField + "<br />";
                                        } else if (isString) {

                                            var stringAttr = anchorme({
                                                input: feature.attributes[key],
                                                options: {
                                                    attributes: {
                                                        target: "_blank"
                                                    }
                                                }
                                            });

                                            sHTML = sHTML + stringAttr + "<br />";
                                        } else {
                                            sHTML = sHTML + feature.attributes[key] + "<br />";
                                        }
                                    }
                                }
                            } else {
                                if (isDate) {
                                    sHTML = sHTML + dateField + "<br />";
                                } else {
                                    sHTML = sHTML + feature.attributes[key] + "<br />";
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!found) {
            sHTML = sHTML + "<b>" + key + ": </b>" + feature.attributes[key] + "<br />";
        }
    }
    if (_layer.hasAttachments) {
        try {
            sHTML = sHTML + "<b>Adjuntos: </b><div id='popupAttachment'></div>";
            _layer.queryAttachmentInfos(objectidc, function (infos) {
                var attachmentHTML = "";
                for (var i = 0; i < infos.length; i++) {
                    if ((infos[i].contentType == "image/jpeg") || (infos[i].contentType == "image/png")) {
                        attachmentHTML = attachmentHTML + "<img src='" + infos[i].url + "' style='width: 100%;' /><br/>";
                    } else {
                        attachmentHTML = attachmentHTML + "<a href='" + infos[i].url + "' target='_blank'>" + infos[i].name + "</a><br/>";
                    }
                }
                $("#popupAttachment").html(attachmentHTML);
            });
        } catch (err) {

        }
    }
    return sHTML;
}

function getDateText(date) {
    if ((typeof date == "string" || date instanceof String)) {
        date = parseInt(date);
    }

    var d = new Date(date);
    var dformat = ((d.getFullYear()) + "/" +
        ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
        ("00" + d.getDate()).slice(-2));
    return dformat;
}

var sistemasCoordenadas = {
    "EPSG:9377": {
        "proj": '+proj=tmerc +lat_0=4.0 +lon_0=-73.0 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkt": 'PROJCS["MAGNA-SIRGAS / CTM12",GEOGCS["MAGNA-SIRGAS",DATUM["Marco_Geocentrico_Nacional_de_Referencia",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6686"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4686"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",4.0],PARAMETER["central_meridian",-73.0],PARAMETER["scale_factor",0.9992],PARAMETER["false_easting",5000000],PARAMETER["false_northing",2000000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","38820"]]',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:4326": {
        "proj": '+proj=longlat +datum=WGS84 +no_defs',
        "wkid": 4326,
        "labLat": "Latitud (N)",
        "labLng": "Longitud (W)",
        "labelLat": "4.668730",
        "labelLng": "-74.100403"
    },
    "EPSG:3857": {
        "proj": '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
        "wkid": 3857,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "517000",
        "labelLng": "-8230000"
    },
    "EPSG:4686": {
        "proj": '+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs',
        "wkid": 4686,
        "labLat": "Norte (N)",
        "labLng": "Este (W)",
        "labelLat": "4.668730",
        "labelLng": "-74.100403"
    },
    "EPSG:21894": {
        "proj": '+proj=tmerc +lat_0=4.59904722222222 +lon_0=-68.0809166666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=221.899,274.136,-397.554,-2.80844591036278,0.44850858891268,2.81017234679107,-2.199943 +units=m +no_defs',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:21896": {
        "proj": '+proj=tmerc +lat_0=4.59904722222222 +lon_0=-77.0809166666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:21897": {
        "proj": '+proj=tmerc +lat_0=4.59904722222222 +lon_0=-74.0809166666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:21898": {
        "proj": '+proj=tmerc +lat_0=4.59904722222222 +lon_0=-71.0809166666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=307,304,-318,0,0,0,0 +units=m +no_defs',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:21899": {
        "proj": '+proj=tmerc +lat_0=4.59904722222222 +lon_0=-68.0809166666667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=intl +towgs84=221.899,274.136,-397.554,-2.80844591036278,0.44850858891268,2.81017234679107,-2.199943 +units=m +no_defs',
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:3114": {
        "proj": '+proj=tmerc +lat_0=4.59620041666667 +lon_0=-80.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkid": 3114,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:3115": {
        "proj": '+proj=tmerc +lat_0=4.59620041666667 +lon_0=-77.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkid": 3115,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:3116": {
        "proj": '+proj=tmerc +lat_0=4.59620041666667 +lon_0=-74.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkid": 3116,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:3117": {
        "proj": '+proj=tmerc +lat_0=4.59620041666667 +lon_0=-71.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkid": 3117,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:3118": {
        "proj": '+proj=tmerc +lat_0=4.59620041666667 +lon_0=-68.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        "wkid": 3118,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32617": {
        "proj": '+proj=utm +zone=17 +datum=WGS84 +units=m +no_defs',
        "wkid": 32617,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32618": {
        "proj": '+proj=utm +zone=18 +datum=WGS84 +units=m +no_defs',
        "wkid": 32618,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32619": {
        "proj": '+proj=utm +zone=19 +datum=WGS84 +units=m +no_defs',
        "wkid": 32619,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32717": {
        "proj": '+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs',
        "wkid": 32717,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32718": {
        "proj": '+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs',
        "wkid": 32718,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:32719": {
        "proj": '+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs',
        "wkid": 32719,
        "labLat": "Norte (m)",
        "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6244": {
        "wkid": 102769, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6245": {
        "wkid": 102790, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6246": {
        "wkid": 102770, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6247": {
        "wkid": 102771, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6248": {
        "wkid": 102793, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6249": {
        "wkid": 102796, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6250": {
        "wkid": 102772, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6251": {
        "wkid": 102788, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6252": {
        "wkid": 102775, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6253": {
        "wkid": 102795, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6254": {
        "wkid": 102781, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6255": {
        "wkid": 102767, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6256": {
        "wkid": 102774, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6257": {
        "wkid": 102768, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6258": {
        "wkid": 102797, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6259": {
        "wkid": 102789, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6260": {
        "wkid": 102780, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6261": {
        "wkid": 102783, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6262": {
        "wkid": 102787, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6263": {
        "wkid": 102791, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6264": {
        "wkid": 102777, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6265": {
        "wkid": 102798, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6266": {
        "wkid": 102779, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6267": {
        "wkid": 102784, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6268": {
        "wkid": 102792, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6269": {
        "wkid": 102782, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6270": {
        "wkid": 102785, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6271": {
        "wkid": 102794, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6272": {
        "wkid": 102773, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6273": {
        "wkid": 102778, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6274": {
        "wkid": 102786, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    },
    "EPSG:6275": {
        "wkid": 102776, "labLat": "Norte (m)", "labLng": "Este (m)",
        "labelLat": "1000000.000",
        "labelLng": "996000.000"
    }
}

var spanishDataTable = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "_MENU_",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "_START_ - _END_ de _TOTAL_ resultados",
    "sInfoEmpty": "No hay resultados",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

function limpiarTexto(str) {
    return accentFold(str.toLowerCase());
}

function accentFold(inStr) {
    return inStr.replace(
        /([àáâãäå])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
        function (str, a, c, e, i, n, o, s, u, y, ae) {
            if (a) return 'a';
            if (c) return 'c';
            if (e) return 'e';
            if (i) return 'i';
            if (n) return 'n';
            if (o) return 'o';
            if (s) return 's';
            if (u) return 'u';
            if (y) return 'y';
            if (ae) return 'ae';
        }
    );
}

function getPropertyById(id) {
    for (var i = 0; i < configProperties.length; i++) {
        if (configProperties[i].property == id) {
            return configProperties[i];
        }
    }
    return null;
}

function getPropertyByIdAlta(id) {
    for (var i = 0; i < configPropertiesAlta.length; i++) {
        if (configPropertiesAlta[i].property == id) {
            return configPropertiesAlta[i];
        }
    }
    return null;
}

function getDeptoByMuni(id) {
    for (var i = 0; i < cacheUnidades.length; i++) {
        if (cacheUnidades[i].type == "DEPTO") {
            if (id.startsWith(cacheUnidades[i].id)) {
                return cacheUnidades[i];
            }
        }
    }
    return null;
}

function getUnidadById(id) {
    for (var i = 0; i < cacheUnidades.length; i++) {
        if (cacheUnidades[i].id == id) {
            return cacheUnidades[i];
        }
    }
}

function getEntidadById(id) {
    for (var i = 0; i < cacheEntidades.length; i++) {
        if (cacheEntidades[i].id == id) {
            return cacheEntidades[i];
        }
    }
}

function lon2tile(lon, zoom) {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}

function lat2tile(lat, zoom) {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}
 