/**
 * @class gato.js
 *
 * @desc Javascript que ejecuta el juego del Gato (MacDroid-Cat).
 *       Es necesario jquery-1.8.2. o anterior
 *       Unipoli Dgo. Ing en Software 6to Cuatrimestre (Graficacion y Multimedia)
 *       Noviembre 2012
 * 
 * @author Andrez Ortiz
 * 
 * @copyright     MacDroid-Cat Copyright 2012
 * @version       gato_k v 1.0
 * @package       gato_app/res/
*/
/******************** ------- Variables Globales ------- **********************/
var matriz = new Array (3); 
    matriz[0] = new Array (0,0,0); 
    matriz[1] = new Array (0,0,0); 
    matriz[2] = new Array (0,0,0); 
var turno = 'android';
var droid_wins = 0;
var mac_wins = 0;
var jugadores = 1;
/******************************************************************************/
/**
  * @desc Funcion principal que se encarga de inicializar todo el juego
  * 
  * @access public     
  * 
  * @return {string} tablero
  */
$(document).ready(function(){
    dibujaTablero(); 
});
/**
  * @desc Funcion dibuja todas las piezas del juego
  * 
  * @access public   
  * 
  * @return {string} out   
  */
function dibujaTablero(){
    out = "";
    //Creo titulo del juego
    out +=  out += "<div id='gato_titulo'></div>";
    //Creo el Tablero Principal
    out += "<table align='center' width='300' id='gato_tablero'>";    
    for(i = 0; i< matriz.length; i++){
        out += "<tr id='row_"+i+"' height='100px' align='center'>";
        for(j=0; j< matriz[i].length; j++){ 
            out += "<td width='100' id='column_"+i+j+"' onClick='juego("+i+","+j+")'> <img class='gato_img' src='' width='64' height='64' style='display:none;'></td>";           
        }
        out += '</tr>';
    }
    out += "</table>";     
    //Creo las tablas de Resulados
    out += "<div id='and_content'><div id='android_back'></div><div class='wins' id='android_wins'><img src='res/img/cup.png'> <label>"+droid_wins+"</label></div></div>";
    out += "<div id='app_content'><div id='apple_back'></div><div class='wins' id='mac_wins'><img src='res/img/cup.png'> <label>"+mac_wins+"</label></div></div>";
    out += "<div id='turno'><div>Turno:</div> <img src='res/img/android.png'> <br>";
    out +=     "<input type='checkbox' id='players' name='players' onClick='players();'><label for='players'>2 Jugadores</label></div>";
    out += "<div id='reiniciar' title='Click para reiniciar juego' onclick='reboot(true);'></div>";
    $('#gato_wrapper').append(out);   
}
/**
  * @desc Funcion que se encarga de dibujar las piezas del gato una vez que se le da click
  * 
  * @access public 
  * 
  * @param {int} i   
  * @param {int} j 
  * 
  */
function juego(i,j){
    //Cuando es el turno de android
    if(turno == 'android'){
        if(matriz[i][j]===0){
            set_jugada(i,j,1);
            switch(ganador()){
                case false:
                    turno = 'apple';            
                    if(jugadores == 1)
                        juega_cpu();
                    break;
                case true: return; break;
            } 
                                
        } 
    //Cuando es el turno de apple
    }
    
    if(turno == 'apple'){
        if(matriz[i][j]===0){  
            set_jugada(i,j,10);
            if(!ganador())
                turno = 'android';
        }
    }
    //Dibujo la imagen del que dio click en el tablero
    $('#turno img').attr('src','res/img/'+turno+'.png');
}
/**
  * @desc Funcion que revisa si hay ganador
  * 
  * @access public   
  * 
  * @returns {bool}  
  * 
  */
function ganador(){ 
    //Si android junta 3 lineas gana
    if( matriz[0][0] + matriz[0][1] +matriz[0][2] == 3 ||
        matriz[1][0] + matriz[1][1] +matriz[1][2] == 3 ||
        matriz[2][0] + matriz[2][1] +matriz[2][2] == 3 ||
        matriz[0][0] + matriz[1][1] +matriz[2][2] == 3 ||
        matriz[2][0] + matriz[1][1] +matriz[0][2] == 3 ||
        matriz[0][0] + matriz[1][0] +matriz[2][0] == 3 ||
        matriz[0][1] + matriz[1][1] +matriz[2][1] == 3 ||
        matriz[0][2] + matriz[1][2] +matriz[2][2] == 3 
        ){            
        alert('Android Gana');
        $('#android_wins label').html(droid_wins++);
        reboot(false);
        return true;
    }
    
    //Si apple junta 3 lineas gana
    if( matriz[0][0] + matriz[0][1] +matriz[0][2] == 30 ||
        matriz[1][0] + matriz[1][1] +matriz[1][2] == 30 ||
        matriz[2][0] + matriz[2][1] +matriz[2][2] == 30 ||
        matriz[0][0] + matriz[1][1] +matriz[2][2] == 30 ||
        matriz[2][0] + matriz[1][1] +matriz[0][2] == 30 ||
        matriz[0][0] + matriz[1][0] +matriz[2][0] == 30 ||
        matriz[0][1] + matriz[1][1] +matriz[2][1] == 30 ||
        matriz[0][2] + matriz[1][2] +matriz[2][2] == 30 
        ){
        alert('Apple Gana');
        $('#mac_wins label').html(mac_wins++);
        reboot(false);
        return true;
    } 
    
    //Validacion por si todas las casillas estan ocupadas y nadie gano
    ocupado = false;
    for(i=0; i<matriz.length; i++){
        for(j=0; j<matriz[i].length; j++){
            if(matriz[i][j] == 0){
                ocupado = true;
                break;
            }
        }
        if(ocupado)break;
    }      
    if(!ocupado){
        alert('Hubo un empate');
        reboot(false);
        return true;
    }
    //Si no hay ganador retorno false para que el juego continue
    return false;
}
/**
  * @desc Funcion que se ejecuta cuando se juega contra la computadora
  * 
  * @access public 
  * 
  * @returns {string} turno
  */
function juega_cpu(){
    turno = 'apple';
    //Ataco y gano
    jugada = get_jugada_ganadora(10);
    if(jugada != -1){
        set_jugada(jugada[0],jugada[1],10); 
        if(!ganador()) return turno= 'android';       
    
    }
    
    //Defiendo Evitando que android gane
    jugada = get_jugada_ganadora(1);
    if(jugada != -1){
        set_jugada(jugada[0],jugada[1],10);        
        if(!ganador()) return turno='android';
    }    
    
    //Ataca para busca poner 2 fichas juntas
    jugada = get_jugada(10);
    if(jugada != -1){
        set_jugada(jugada[0],jugada[1],10);        
        if(!ganador()) return turno='android';
    } 
    
    //Defiende para busca que no se pongan 2 fichas juntas
    jugada = get_jugada(1);
    if(jugada != -1){
        set_jugada(jugada[0],jugada[1],10);        
        if(!ganador()) return turno='android';
    }        
    return turno = 'android';  
}
/**
  * @desc Funcion que inserta la jugada dependiendo del jugador
  * 
  * @access public
  * 
  * @params {int} fila
  * @params {int} columna
  * @params {int} player 
  * 
  * @returns {int} 
  */
function set_jugada(fila,columna,player){    
    matriz[fila][columna]= player; 
    g = $('#column_'+fila+columna+' img');
    g.attr({'src':'res/img/'+turno+'.png'}); 
    g.css('display','');
}
/**
  * @desc Funcion que obtiene la posicion del tablero donde hay posibilidades de hacer 3 en fila columna o diagonal
  *       Devuelve la posicion donde hay que colocar la posicion para hacerlo
  * 
  * @access public 
  * 
  * @params {int} x
  * 
  * @returns {int} posicion
  */
function get_jugada_ganadora(x){    
    for(i=0; i<3; i++){
        //Compruebo si se puede hacer jugada en las filas
        if(matriz[i][0] == x && matriz[i][1] == x){
            if(matriz[i][2] == 0) return [i,2] ;
        }        
        if(matriz[i][0] == x && matriz[i][2] == x){
            if(matriz[i][1] == 0) return [i,1] ;
        }        
        if(matriz[i][1] == x && matriz[i][2] == x){
            if(matriz[i][0] == 0) return [i,0] ;
        }
        
        //Compruebo si se puede hacer jugada en una columna
        if(matriz[0][i] == x && matriz[1][i] == x){
            if(matriz[2][i] == 0) return [2,i] ;
        }
        if(matriz[0][i] == x && matriz[2][i] == x){
            if(matriz[1][i] == 0) return [1,i] ;
        }
        if(matriz[1][i] == x && matriz[2][i] == x){
            if(matriz[0][i] == 0) return [0,i] ;
        }
    }  
    
    //Compruebo si se puede hacer jugada en diagonal
    if(matriz[0][0] == x && matriz[1][1] == x){
        if(matriz[2][2] == 0) return [2,2] ;
    }
    if(matriz[0][0] == x && matriz[2][2] == x){
        if(matriz[1][1] == 0) return [1,1] ;
    }
    if(matriz[1][1] == x && matriz[2][2] == x){
        if(matriz[0][0] == 0) return [0,0] ;
    }
    
    //Compruebo si se puede hacer jugada en Diagonal invertida
    if(matriz[0][2] == x && matriz[1][1] == x){
        if(matriz[2][0] == 0) return [2,0] ;
    }
    if(matriz[0][2] == x && matriz[2][0] == x){
        if(matriz[1][1] == 0) return [1,1] ;
    }
    if(matriz[1][1] == x && matriz[2][0] == x){
        if(matriz[0][2] == 0) return [0,2] ;
    }
    return -1;    
}
/**
  * @desc Funcion que obtiene la posicion del tablero donde hay posibilidades de formar una jugada ganadora
  *       Devuelve la posicion donde hay que colocar la posicion para hacerlo
  * 
  * @access public 
  * 
  * @params {int} x
  * 
  * @returns {int} posicion
  */
function get_jugada(x){ 
    //Compruebo si se puede hacer jugada en fila con otra ficha
    for(i=0; i<3; i++){
        //Compruebo si se puede hacer jugada en las filas
        if(matriz[i][0] == x && matriz[i][1] == 0 && matriz[i][2] == 0) return [i,2] ; 
        if(matriz[i][0] == 0 && matriz[i][1] == x && matriz[i][2] == 0) return [i,0] ; 
        if(matriz[i][0] == 0 && matriz[i][1] == 0 && matriz[i][2] == x) return [i,1] ;         
        //Compruebo si se puede hacer jugada en una fila
        if(matriz[0][i] == x && matriz[1][i] == 0 && matriz[2][i] == 0) return [2,i] ;
        if(matriz[0][i] == 0 && matriz[1][i] == x && matriz[2][i] == 0) return [0,i] ;
        if(matriz[0][i] == 0 && matriz[1][i] == 0 && matriz[2][i] == x) return [1,i] ;
    }    
    //Compruebo si se puede hacer jugada en diagonal
    if(matriz[0][0] == x && matriz[1][1] == 0 && matriz[2][2] == 0) return [2,2] ;    
    if(matriz[0][0] == 0 && matriz[1][1] == x && matriz[2][2] == 0) return [0,0] ;    
    if(matriz[0][0] == 0 && matriz[1][1] == 0 && matriz[2][2] == x) return [1,1] ;   
    //Compruebo si se puede hacer jugada en Diagonal invertida
    if(matriz[0][2] == x && matriz[1][1] == 0 && matriz[2][0] == 0) return [2,0] ;
    if(matriz[0][2] == 0 && matriz[1][1] == x && matriz[2][0] == 0) return [0,2] ;
    if(matriz[0][2] == 0 && matriz[1][1] == 0 && matriz[2][0] == x) return [1,1] ;    
    //Pongo en el centro si es la primer jugada
    if(matriz[1][1] == 0) return[1,1];    
    return -1;
}
/**
  * @desc Funcion que revisa cuantos jugadores hay, si uno vs compu o 2.
  * 
  * @access public 
  * 
  * @returns {int} jugadores
  */
function players(){
    if($('#players').is(':checked')) jugadores = 2; 
    else {
        jugadores = 1;
        turno ='android';         
        $('#turno img').attr('src','res/img/'+turno+'.png');
    }
    reboot(false);
}
/**
  * @desc Funcion que limpia el tablero y reinicia el juego
  * 
  * @access public 
  * 
  * @params {bool} todo 
  */
function reboot(todo){
    
    $('.gato_img').each(function(){$(this).attr({'src':''}); $(this).css('display','none')});
    for(i=0; i<matriz.length; i++){
        for(j=0; j<matriz[i].length; j++){
            matriz[i][j] = 0;
        }
    }    
    if(todo){
        droid_wins=0;
        mac_wins=0;
        $('#android_wins label').html(droid_wins);
        $('#mac_wins label').html(mac_wins);
    }        
}
