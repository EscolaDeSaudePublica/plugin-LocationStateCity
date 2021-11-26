$(document).ready(function () {
    // PARA PREENCHIMENTO DO MUNICIPIO QUANDO A PÁGINA É CARREGADA
    function getCity() {
        var dataLocation = {
            'key' : 'En_Municipio',
            'idAgente'  : MapasCulturais.entity.id
        };
        if(MapasCulturais.request.controller == 'agent') {
            dataLocation.params = 'agent';
        }else if(MapasCulturais.request.controller == 'space'){
            //dataLocation.push('params' , 'agent');
            dataLocation.params = 'space';
        }
       
        console.log(dataLocation);
            // BUSCANDO NO BANCO QUAL A CIDADE CADASTRADA, CASO HAJA
            $.getJSON(MapasCulturais.baseURL+ 'location/city/', dataLocation,
                function (data, textStatus, jqXHR) {
                    console.log(data)
                    if(data.status == 200){
                        
                        if(document.URL.match(/edita/)) {
                            $('#En_Municipio').editable({
                                mode        : 'inline',
                                source      : {'value': data.message}
                            });
                            console.log(data.message);
                            $('#En_Municipio').html(data.message);
                        }else if(document.URL.match(/create/)) {
                            $('#En_Municipio').editable({
                                mode        : 'inline',
                                source      : {'value': data.message}
                            });
                            console.log(data.message);
                            $('#En_Municipio').html(data.message);
                        }
                        else{
                            //$('#En_Municipio').editable();
                            $('#En_Municipio').html(data.message);
                            $("#En_Municipio").removeClass('editable editable-click editable-empty');
                        }
                    }
                    else{
                        $('#En_Municipio').editable({
                            mode        : 'inline',
                            source      : {'value': data.message}
                        });
                        console.log(data.message);
                        $('#En_Municipio').html(data.message);
                    } 
                    
                }
            );
    }
    getCity();


     // QUANDO SALVA O ESTADO O ARRAY COM OS MUNICIPIOS É PREENCHIDO
    /**
     * NOTA: ADICIONADO O SELECT2 PARA FACILITAR NA BUSCA DA CIDADE
     */
     $('#En_Estado').on('hidden', function() {
        var estado = $('#En_Estado').editable('getValue', true);
        var totosDistritos = MapasCulturais['ibge'][estado];
        var distrito = [];
        $.each(totosDistritos, function(indexInArray, valueOfElement) {
            distrito.push(valueOfElement);
        });
        var sourceCity = [];
        // REMOVENDO O ELEMENTO ATUAL
        $('#En_Municipio').remove();
        // CRIANDO  UM ELEMENTO PARA ARRAY COM AS CIDADES
        $("#divMunicipio").append('<span class="js-editable" id="En_Municipio" data-original-title="Municipio" data-emptytext="Insira o Município" data-type="select2" data-showButtons="bottom"></span>');
        $.each(distrito[3], function(indexInArray, valueOfElement) {
            // POPULANDO O ARRAY
            sourceCity.push({ 'id': valueOfElement.nome, 'text': valueOfElement.nome });
        });
        //INSTANCIANDO O X-EDITABLE COM SELECT2
        $('#En_Municipio').editable({
            mode: 'inline',
            source: sourceCity,
            placeholder: 'insira um município'
        });
    });
});