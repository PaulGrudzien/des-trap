const tapis = document.querySelector('.tapis')
const bouton = document.querySelector('input')
const faces = ['zzz.png', 'etoile.png', 'bouclier.png']
const des = [{face:'zzz.png', relancer:false}, {face:'zzz.png', relancer:false}, {face:'zzz.png', relancer:false}, {face:'zzz.png', relancer:false}, {face:'zzz.png', relancer:false}]

function lancer() {
    des.forEach((de, i) => {
        const image = document.createElement("img")
        de.face = faces[Math.floor(Math.random()*faces.length)]
        de.relancer = false
        image.src = de.face
        image.id = i
        tapis.appendChild(image)
    })
    bouton.value = "Relancer"
}

function selectionner(i) {
    console.log(i)
    const image = document.getElementById(i)
    if (des[i].relancer) {
        image.className = ""
        des[i].relancer = false
    } else {
        image.className = "relancer"
        des[i].relancer = true
    }
}

function relancer() {
    des.forEach((de, i) => {
        if (de.relancer) {
            const image = document.getElementById(i)
            de.face = faces[Math.floor(Math.random()*faces.length)]
            image.className = ""
            image.src = de.face
        }
    })
    bouton.value = "Ramasser"
}

function ramasser() {
    tapis.innerHTML = ''
    bouton.value = "Lancer"
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
