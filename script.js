const tapis = document.querySelector('.tapis')
const bouton = document.querySelector('input')
const par = document.querySelector('p.consigne')
const histo = document.querySelector('div.historique')
const faces = ['zzz.png', 'etoile.png', 'bouclier.png']
const bgs = ['blue', 'black', 'white']
const des = [{face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}, {face:'zzz.png', relancer:true}]

function shake(element) {
  element.className = "de";
  window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {
      element.className = "de shake";
    });
  });
}

function lancer() {
    des.forEach((de, i) => {
        const div = document.createElement("div")
        const image = document.createElement("img")
        const a = Math.floor(Math.random()*faces.length)
        de.face = faces[a]
        de.bg = bgs[a]
        de.relancer = true
        image.src = de.face
        div.style.backgroundColor = de.bg
        div.id = i
        div.className = "de"
        div.appendChild(image)
        tapis.appendChild(div)
        shake(div)
    })
    bouton.value = "Relancer"
	bouton.className = "orange"
	par.textContent = "Cliquer sur les dés à garder."
}

function selectionner(i) {
    const image = document.getElementById(i)
    if (des[i].relancer) {
        image.className = "de garder"
        des[i].relancer = false
    } else {
        image.className = "de"
        des[i].relancer = true
    }
}

function relancer() {
    des.forEach((de, i) => {
        if (de.relancer) {
            const div = document.getElementById(i)
            const image = div.firstChild
            const a = Math.floor(Math.random()*faces.length)
            de.face = faces[a]
            de.bg = bgs[a]
            image.src = de.face
            div.style.backgroundColor = de.bg
            shake(div)
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
	const mainDiv = document.createElement("div")
	des.forEach(de => {
	    const div = document.createElement("div")
	    const image = document.createElement("img")
	    image.src = de.face
        div.style.backgroundColor = de.bg
        div.className = "de"
	    div.appendChild(image)
	    mainDiv.appendChild(div)
	})
	histo.insertBefore(mainDiv, histo.firstChild);
}

function handleClick(event) {
    if (event.target.tagName == 'IMG' && bouton.value == 'Relancer') {
        selectionner(event.target.parentNode.id)
    } else if (event.target.tagName == 'INPUT') {
        if (event.target.value == 'Lancer') {lancer()}
        else if (event.target.value == 'Relancer') {relancer()}
        else if (event.target.value == 'Ramasser') {ramasser()}
    }
}

document.querySelector('.main').addEventListener("click", handleClick)
