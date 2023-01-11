const doc = document,
    wrapper = doc.querySelector(".wrapper"),
    selectBox = doc.querySelector(".image-box"),
    previewImg = doc.querySelector(".image-box img"),
    inputImage = doc.querySelector(".image-box input"),
    heightInput = doc.querySelector("#height"),
    widthInput = doc.querySelector("#width"),
    ratioInput = doc.querySelector("#ratio"),
    qualityInput = doc.querySelector("#compress"),
    downloadBtn = doc.querySelector('.download')
let ogImageRatio;
function loadImage(e){
    const img = e.target.files[0]
    if(!img) return

    let url = URL.createObjectURL(img)
    
    previewImg.src = url
    previewImg.onload = () => {
        heightInput.value = previewImg.naturalHeight
        widthInput.value = previewImg.naturalWidth
        wrapper.classList.add('active')
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
    }
}
function download(){
    let canvas = doc.createElement('canvas')
        ctx = canvas.getContext('2d'),
        a = doc.createElement('a'),
        imageQuality = qualityInput.checked ? 0.7 : 1
    canvas.width = widthInput.value
    canvas.height = heightInput.value
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)
    a.href = canvas.toDataURL("image/jpeg", imageQuality)
    a.download = new Date().getTime()
    a.click()
}
window.onload = () =>{
    inputImage.addEventListener(('change'), loadImage)
    selectBox.addEventListener(('click'), () => inputImage.click())
}
widthInput.addEventListener(('keyup'), ()=>{
    ratioInput.checked ? heightInput.value =  Math.floor(widthInput.value / ogImageRatio) : heightInput.value
})
heightInput.addEventListener(('keyup'), ()=>{
    ratioInput.checked ? widthInput.value =  Math.floor(heightInput.value * ogImageRatio) : widthInput.value
})
downloadBtn.addEventListener(('click'), download)