import { Notify } from "notiflix";
import instance from "./Assets/axiosInstances";
import renderCards from "./renderCards";
const modal = document.querySelector(".cardEdit");
const edit = (cardId) => {
    console.log(cardId);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
             Authorization: `Bearer ${token}`
            }
    }
    instance.get(`/${cardId}`, config)
    .then((res) => {
        console.log(res.data)
        let cardInfo = res.data;
        let formsEl = ''
        for(const params in cardInfo) { 
            switch(params){ 
                case 'description': 
                formsEl += `
                <li class="editItem">
                    <p class="editParam">${params}</p>
                    <textarea id="formEl" class="editInput" type="text" form-name="${params}"  placeholder="Напишіть назву візиту">
                        ${res.data[params]}
                    </textarea>
                </li>`
                break
                case "lastVisit":
                formsEl += `
                <li class="editItem">
                    <p class="editParam">${params}</p>
                    <input id="formEl" class="editInput" type="date" form-name="${params}" value="${res.data[params]}" placeholder="Напишіть назву візиту">
                </li>
                `
                break
                case "doctor": 
                formsEl += ''
                break
                case "time": 
                formsEl += ''
                break
                default:
                    formsEl += `
                    <li class="editItem">
                        <p class="editParam">${params}</p>
                        <input id="formEl" class="editInput" type="text" form-name="${params}" value="${res.data[params]}" placeholder="Напишіть назву візиту">
                    </li>
                    `
            }
           
        }
        modal.style.display ="block";
        modal.innerHTML = `
        <p class="paragrafCardEdit">Редагувати картку</p>
        <div class="sectionContainer">
        <select id="formEl" class="selectItem" form-name="doctor">
            <option disabled  value="none">Зробіть свій вибір</option>
            <option ${res.data.doctor=="Cardiologist" ? "selected" : ""} value="Cardiologist">Кардіолог</option>
            <option value="stomatolog">Стоматолог</option>
            <option value="terapevt">Терапевт</option>
        </select>
        <select id="formEl" class="selectItem" form-name="time">
            <option disabled>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
        </select>
        </div>
        <ul class="editList">
            ${formsEl}
        </ul>
        <div class="editBtns">
            <button class="editBtn editCancel">Назад</button>
            <button class="editBtn editSave">Зберегти</button>
        </div>
        `
        const editCancel = document.querySelector('.editCancel')
        editCancel.addEventListener('click', () => {
            modal.style.display ="none";
        })
        const editSave = document.querySelector('.editSave');
        editSave.addEventListener('click', () => { 
            const formAll = document.querySelectorAll("#formEl")
            let formBP = parseInt(document.querySelector('input[form-name = "bp"]').value)
            if (formBP == NaN){ 
                Notify.warning('Введіть правильний тиск')
            } else { 
                let newCard = {}
                formAll.forEach(formEl => {
                    newCard = { 
                        ...newCard,
                        [formEl.getAttribute('form-name')]: formEl.value ? formEl.value : res.data[formEl.getAttribute('form-name')]
                    }
                })
                console.log(newCard)
                instance.put(`/${cardId}`,newCard,config)
                .then((res)=>{
                    if (res.status === 200){
                        modal.style.display ="none";
                        renderCards()
                    }
                })
            }
        });
        
    });
}
export default edit

