import { Notify } from "notiflix";
import instance from "./Assets/axiosInstances"
import openCard from "./openCard";
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
        if (filterEl.title.value.length > 0){
            instance.get('/', config)
            .then((res) =>{
                const cardSearch = res.data.filter(card=>{
                    if (
                        card.title.toLowerCase() === filterEl.title.value.toLowerCase() &&
                        card.time == filterEl.time.value
                    ) {
                        return card
                    }
                })
                if (cardSearch.length > 0){
                    openCard(cardSearch[0].id)
                } else {
                    Notify.warning("Error, card is not found")
                }
            })
        } else {
            Notify.warning('Please write some on filter panel')
        }
        
    })
}

export default filter