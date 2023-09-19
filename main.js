const fileInput=document.querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
filterName=document.querySelector("filter-info .name"),
filterValue=document.querySelector("filter-info .value"),
filterSlider=document.querySelector(".slider .input"),
rotateOptions=document.querySelectorAll(".rotate button"),
previewImg=document.querySelector(".preview-img img"),
resetFilterBtn=document.querySelector(".reset-filter")
chooseImgBtn=document.querySelector(".choose-img");
saveImgBtn=document.querySelector(".save-img");

let brightness=100, saturation=100, inversion=0, grayscale=0;
let rotate=0, flipVertical=1, flipHorizontal=1;

const applyFilters = () =>{
    previewImg.Style.transform='rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})' ;
    previewImg.Style.filter='brightness(${brightness}%) saturate(${saturatio}%) invert(${inversion}% grayscale(${grayscale}%';
}

const loadImage = () => {
    let file=fileInput.files[0]; //getting user selected file
    if(!file) return; //return if user hasnt selected file
    previewImg.src=URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load",() =>{
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option =>{
    option.addEventListener("click",() =>{ //adding click event listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText=option.innerText;

        if(option.id==="brightness"){
            filterSlider.max="200";
            filterSlider.Value="brightness";
            filterValue.innerText='${brightness}%';
        }else if(option.id==="saturation"){
            filterSlider.max="200";
            filterSlider.Value="saturation";
            filterValue.innerText='${saturation}%';
        }else if(option.id==="inversion"){
            filterSlider.max="100";
            filterSlider.Value="inversion";
            filterValue.innerText='${inversion}%';
        }else if(option.id==="grayscale"){
            filterSlider.max="100";
            filterSlider.Value="grayscale";
            filterValue.innerText='${grayscale}%';
        }

    });
});

const updateFilter =() =>{
    filterValue.innerText = '${filterSlider.value}%';
    const selectedFilter=document.querySelector(".filter .active"); //getting selected filter button

    if(selectedFilter.id === "brightness"){
        brightness= filterSlider.Value;
    }else if(selectedFilter.id === "saturation"){
       saturation= filterSlider.Value;
    }else if(selectedFilter.id === "inversion"){
        inversion= filterSlider.Value;
}else if(selectedFilter.id === "grayscale"){
    grayscale= filterSlider.Value;
}

  applyFilters();
}

rotateOption.forEach(option =>{
    option.addEventListener("click",() =>{ //adding click event listener to all rotate/flip function
        if(option.id ==="left"){
            rotate -=90; //if clicked btn is left rotate, decrement rotate value by -90
        } else if(option.id ==="right"){
            rotate +=90; //if clicked btn is right rotate, increment rotate value by +90
        } else if(option.id==="vertical"){
            // if flipVertical value is 1, set this value to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        } else {
            flipHorizontal=flipHorizontal === 1 ? -1 : 1;     
           }
        applyFilters();
    });
});
const resetFilter = ()=>{
      brightness=100; saturation=100; inversion=0; grayscale=0;
      rotate=0; flipVertical=1; flipHorizontal=1;
      filterOptions[0].click(); // clicking brightness btn ,brightness selected by  default
      applyFilters();
}
  const saveImage =() =>{
    const canvas = document.createElement("canvas"); // create canvas element
    const ctx= canvas.getContext("2d"); // canvas.getcontext return tom a drawing context on he canvas
    canvas.width= previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;
     //applying user slected filters to canvas filter
    ctx.filter='brightness(${brightness}%) saturate(${saturatio}%) invert(${inversion}% grayscale(${grayscale}%';
    ctx.translate(canvas.width /2,canvas.height /2);
    if (rotate !== 0){
        ctx.rotate(rotate * Math.PI /180);
    }


    ctx.scale(flipHorizontal,flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
     
    const link =document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();

  }   


fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click",resetFilter);
saveImgBtn.addEventListener("click",saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());