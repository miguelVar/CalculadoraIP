/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function calcular() {
    var regularExpresion = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/[0-9]{1,2}$/;
    var texto = document.getElementById("ip").value;
    var estado = regularExpresion.test(texto);
    var arrayIP = new Array();


    if (estado) {

        //---------------------Datos de la ip-------------------
        var datip = texto.split(".");
        var datmascara = datip[3].split("/");
        for (let i = 0; i < datip.length - 1; i++) {
            arrayIP.push(datip[i]);
        }
        arrayIP.push(datmascara[0]);
        arrayIP.push(datmascara[1]);

        // for(let i=0; i<arrayIP.length;i++){
        //  alert(arrayIP[i]);
        //}

        //---------------------------------------------------------------

        if (arrayIP[0] <= 255 && arrayIP[1] <= 255 && arrayIP[2] <= 255 && arrayIP[3] <= 255 && arrayIP[4] <= 32 && arrayIP[4] >= 8) {

            var content = document.getElementById("rta");
            content.innerHTML = "";
            var table = document.createElement("table");
            table.setAttribute("border", "2");
            var trh = document.createElement("tr");
            var thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Titulo"));
            thhead.style.background = "black";
            thhead.style.color = "white";
            trh.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Valor"));
            thhead.style.background = "black";
            thhead.style.color = "white";
            trh.appendChild(thhead);
            table.appendChild(trh);

            //---------------Clase IP.:::::::::::::::::.
            var trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Clase de red"));
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(clase(parseInt(arrayIP[0]))));
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);


            //----------- MAscara de red --------------------
            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Mascara de Red"));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(mascaraRed(parseInt(arrayIP[4]))));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);



            //-----------direccion ip en binario-------------------------


            var bin1 = parseInt(arrayIP[0]).toString(2);
            var bin2 = parseInt(arrayIP[1]).toString(2);
            var bin3 = parseInt(arrayIP[2]).toString(2);
            var bin4 = parseInt(arrayIP[3]).toString(2);
            var bintotal = bin1 + "." + bin2 + "." + bin3 + "." + bin4;
            // alert(bintotal);

            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Direccion ip"));
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(direccionRed(bintotal)));
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);

            //-----------------------Direccion de red--------------------------

            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Direccion de red"));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            var dirfin = direccionRed(bintotal);
            thhead.appendChild(document.createTextNode(dirRed(dirfin, 32 - parseInt(arrayIP[4]))));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);


            //---------------------------Numero de host--------------------------
            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Host"));
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(numhost(parseInt(arrayIP[4]))));
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);

            //---------------------------Numero de subredes--------------------------
            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Subredes"));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(Math.pow(2, parseInt(arrayIP[4]) - numSubRedes(parseInt(arrayIP[0])))));
            thhead.style.background = "aliceblue";
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);


            //---------------------------broadcast--------------------------
            trmascara = document.createElement("tr");
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode("Broadcast"));
            trmascara.appendChild(thhead);
            thhead = document.createElement("th");
            thhead.appendChild(document.createTextNode(broadcast(dirfin, 32 - parseInt(arrayIP[4]))));
            trmascara.appendChild(thhead);
            table.appendChild(trmascara);




            content.appendChild(table);
        } else {
            alert("Ip ingresada incorrecta, excede los limites o el sufijo de mascara supera el 32 o es menor a 8");
        }


    } else {
        alert("Ip ingresada incorrecta");
    }
}

function clase(num) {
    if (num >= 0 && num <= 127) {
        return 'A';
    } else if (num >= 128 && num <= 191) {
        return 'B';
    } else if (num >= 129 && num <= 223) {
        return 'C';
    } else if (num >= 224 && num <= 239) {
        return 'D';
    } else if (num >= 240 && num <= 255) {
        return 'E';
    }
}

function numSubRedes(num) {
    if (num >= 0 && num <= 127) {
        return 8;
    } else if (num >= 128 && num <= 191) {
        return 16;
    } else if (num >= 129 && num <= 223) {
        return 24;
    }
}


function mascaraRed(num) {
    var ip = "";

    for (let i = 1; i <= 32; i++) {
        if (i <= num) {
            ip += 1;
        } else {
            ip += 0;
        }
    }
    var pos = 0;
    var conip = "";
    var contPuntos = 0;
    var masDec = "";

    for (let k = 0; k < ip.length; k++) {
        //alert(ip.length);
        pos++;
        if (pos <= 8) {
            conip += ip.charAt(k);
            //alert(conip);
        }
        if (pos == 8 && k < ip.length - 1) {
            conip += ".";
            pos = 0;
        }


    }

    var nums = conip.split(".");
    for (let h = 0; h < nums.length; h++) {
        var conversion = parseInt(nums[h], 2);
        // alert(conversion);
        masDec += conversion;
        if (h < nums.length - 1) {
            masDec += ".";
        }
    }
    return masDec;
}

function numhost(num) {
    return num<=31?Math.pow(2, (32 - num)) - 2:0;
}

function direccionRed(total) {
    var ipcompleta = "";
    var arrtotal = total.split(".");
    for (let y = 0; y < arrtotal.length; y++) {
        if (arrtotal[y].length == 8) {
        } else {
            while (arrtotal[y].length < 8) {
                arrtotal[y] = "0" + arrtotal[y];
            }
        }

    }

    for (let t = 0; t < arrtotal.length; t++) {
        ipcompleta += arrtotal[t];
        if (t < arrtotal.length - 1) {
            ipcompleta += ".";
        }
    }
    return ipcompleta;
}

function dirRed(ip, numHosts) {
    var ipp = ip.split(".");
    var contador = 0;
    var key = 0;
    // alert(numHosts);
    for (let b = ipp.length - 1; b > 0; b--) {
        for (let q = ipp[b].length - 1; q >= 0; q--) {
            if (contador < numHosts) {
                contador++;
                key++;
            }

        }
        if (key > 0) {
            // alert(key);
            ipp[b] = ipp[b].substring(0, ipp[b].length - key);


            for (let x = 0; x < key; x++) {
                ipp[b] = ipp[b] + "0";
            }
            key = 0;
            //alert(ipp[b]);
        }
    }

   // ipp[3] = ipp[3].substring(0, ipp[3].length - 2) + "1";
    // alert(ipp[3]);
    var ipred = "";
    for (let p = 0; p < ipp.length; p++) {
        ipred += parseInt(ipp[p], 2);
        if (p < ipp.length - 1) {
            ipred += ".";
        }
    }
    return ipred;
}


function broadcast(ip, numHosts) {
    var ipp = ip.split(".");
    var contador = 0;
    var key = 0;
    //alert(numHosts);
    for (let b = ipp.length - 1; b > 0; b--) {
        for (let q = ipp[b].length - 1; q >= 0; q--) {
            if (contador < numHosts) {
                contador++;
                key++;
            }

        }
        if (key > 0) {
            // alert(key);
            ipp[b] = ipp[b].substring(0, ipp[b].length - key);


            for (let x = 0; x < key; x++) {
                ipp[b] = ipp[b] + "1";
            }
            key = 0;
            // alert(ipp[b]);
        }
    }
    var ipbroadcast = "";
    for (let p = 0; p < ipp.length; p++) {
        ipbroadcast += parseInt(ipp[p], 2);
        if (p < ipp.length - 1) {
            ipbroadcast += ".";
        }
    }
    return ipbroadcast;
}