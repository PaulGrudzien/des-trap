const tapis = document.querySelector('.tapis')
const bouton = document.querySelector('input')
const par = document.querySelector('p.consigne')
const histo = document.querySelector('div.historique')
const faces = ['zzz.png', 'etoile.png', 'bouclier.png']
const des = [{face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}]

function shake(element) {
  element.className = "";
  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
      element.className = "shake";
    });
  });
}

function lancer() {
    des.forEach((de, i) => {
        const image = document.createElement("img")
        de.face = faces[Math.floor(Math.random()*faces.length)]
        de.relancer = true
        image.src = de.face
        image.id = i
        tapis.appendChild(image)
        shake(image)
    })
    bouton.value = "Relancer"
	bouton.className = "orange"
	par.textContent = "Cliquer sur les dés à garder."
}

function selectionner(i) {
    const image = document.getElementById(i)
    if (des[i].relancer) {
        image.className = "garder"
        des[i].relancer = false
    } else {
        image.className = ""
        des[i].relancer = true
    }
}

function relancer() {
    des.forEach((de, i) => {
        if (de.relancer) {
            const image = document.getElementById(i)
            de.face = faces[Math.floor(Math.random()*faces.length)]
            image.src = de.face
            shake(image)
        }
    })
    bouton.value = "Ramasser"
	bouton.className = "rouge"
	par.textContent = " "
}

function ramasser() {
    tapis.innerHTML = ''
    bouton.value = "Lancer"
	bouton.className = "vert"
	const div = document.createElement("div")
	des.forEach(de => {
	    const image = document.createElement("img")
	    image.src = de.face
	    div.appendChild(image)
	})
	histo.insertBefore(div, histo.firstChild);
}

function handleClick(event) {
    if (event.target.tagName == 'IMG' && bouton.value == 'Relancer') {
        selectionner(event.target.id)
    } else if (event.target.tagName == 'INPUT') {
        if (event.target.value == 'Lancer') {lancer()}
        else if (event.target.value == 'Relancer') {relancer()}
        else if (event.target.value == 'Ramasser') {ramasser()}
    }
}

document.querySelector('.main').addEventListener("click", handleClick)
