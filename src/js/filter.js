import { Notify } from "notiflix";
import instance from "./Assets/axiosInstances"
import openCard from "./openCard";
import { renderCardsList } from "./Assets/renderList";
import renderCards from "./renderCards";
const filter = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
             Authorization: `Bearer ${token}`
            }
    }
    const filterEl = {
        status: document.querySelector('#filterStatus'),
        title: document.querySelector('#filterTitle'),
        time: document.querySelector('#filterTime'),
        btnSearch: document.querySelector('#filterBtn')
    }
    filterEl.btnSearch.addEventListener('click',() => {
       
            instance.get('/', config)
            .then((res) =>{
                const cardSearch = res.data.filter(card=>{
                    
                  if (
                        card.status == filterEl.status.value ||
                        card.title.toLowerCase() == filterEl.title.value.toLowerCase() ||
                        card.time == filterEl.time.value
                    ) {
                        return card
                    }
                })
                console.log(cardSearch)
                if (cardSearch.length > 0){
                    renderCardsList(cardSearch)
                } else {
                    Notify.warning("Error, card is not found")
                    renderCards()
                }
            })
        
    })
}

export default filter