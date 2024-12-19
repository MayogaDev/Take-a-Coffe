let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


class FlipBook{
    constructor(bookElem){
        this.elems={
            book:bookElem, leaves:bookElem.querySelectorAll(".leaf"),buttons:{
                next:document.getElementById("nextPage"),
                prev:document.getElementById("prevPage")
            }
        };
        this.setupEvents();
        this.currentPagePosition = 0;
        this.turnPage(0);
    }
    setPagePosition(page,position,index){
        var transform = "";
        transform = "translate3d(0,0,"+((position<0?1:-1)*Math.abs(index))+"px)"

        if(position<0){
            transform+="rotate3d(0,1,0,-180deg)";

            page.classList.add("turned")
        }else{
            page.classList.remove("turned")
        }
        if(page.style.transform != transform){
            page.style.transform= transform;
        }
    }
    turnPage(delta){
        this.currentPagePosition+=delta;
        if(this.currentPagePosition < 0){
            this.currentPagePosition = 0;
            return;
        }
        if(this.currentPagePosition > this.elems.leaves.length){
            this.currentPagePosition = this.elems.leaves.length;
            return;
        }
        this.elems.leaves.forEach((page,index)=>{
            var pageNumber = index;
            this.setPagePosition(page,pageNumber-this.currentPagePosition,index)
        });

        if(this.currentPagePosition == 0){
            this.elems.buttons.prev.setAttribute("disabled","disabled");
        }else
            if(this.currentPagePosition == this.elems.leaves.length){
                 this.elems.buttons.next.setAttribute("disabled","disabled");
            } else{
                 this.elems.buttons.next.removeAttribute("disabled");
                     this.elems.buttons.prev.removeAttribute("disabled");
            }
        }

        setupEvents(){
            document.getElementById("nextPage").addEventListener("click",()=>{
                this.turnPage(1);
            });
              document.getElementById("prevPage").addEventListener("click",()=>{
                this.turnPage(-1);
        });
    }

}
var flipBook = new FlipBook(document.getElementById("flipbook"));
