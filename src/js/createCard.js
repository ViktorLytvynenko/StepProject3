import instance from "./Assets/axiosInstances"
import {Notify} from 'notiflix/build/notiflix-notify-aio';
const modal = document.querySelector('.cardCreate')
const postNewCard = () =>{
    const token = localStorage.getItem("token");
    const config = {
        headers: {
             Authorization: `Bearer ${token}`
            }
    }
    const newCard = JSON.parse(localStorage.getItem("newCard"));
    instance.post('/', newCard, config)
        .then((res) => {
            if(res.status == 200){
                modal.innerHTML = `
                    <p class="createTitle">Нова картка створена</p>
                `
                setTimeout(()=>{
                    modal.style.display = 'none'
                },2500)
            }
        })
}

const stemForm = () => {
    modal.innerHTML = `
    <p class="createTitle">Заповнення форми</p>
    <div class="cardCreate_body">
    <ul class="editList">
        <li class="editItem">
            <p class="editParam">Title</p>
            <input id="formTitle" class="editInput" type="text"  placeholder="Напишіть назву візиту">
        </li>
        <li class="editItem">
            <p class="editParam">Age</p>
            <input id="formAge" class="editInput" type="text"  placeholder="Напишіть вік">
        </li>
        <li class="editItem">
            <p class="editParam">Weight</p>
            <input id="formWeight" class="editInput" type="text" placeholder="Напишіть вагу">
        </li>
        <li class="editItem">
            <p class="editParam">BP</p>
            <input id="formBp" class="editInput" type="text" placeholder="Напишіть тиск">
        </li>
    </ul>
    </div>
    <div class="createBtns">
        <button id="btnPrevToSelect" class="createBtns_item editCancle">Назад</button>
        <button id="btnSaveCard" class="createBtns_item editSave">Створити</button>
    </div>
    `
    const btnPrev = document.querySelector('#btnPrevToSelect')
    btnPrev.addEventListener('click', () =>{
        stepSelectTime()
    })
    const btnSaveCard = document.querySelector('#btnSaveCard')
    btnSaveCard.addEventListener('click', () =>{
        const formEl = { 
            title: document.querySelector('#formTitle'),
            age: document.querySelector('#formAge'),
            weight : document.querySelector('#formWeight'),
            bp: document.querySelector('#formBp')
        }
        const formData = {
            title: formEl.title.value,
            age: formEl.age.value,
            weight: formEl.weight.value,
            bp: formEl.bp.value
        }
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            ...formData
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        if (
            formData.title.length !=0 &&
            formData.age.length !=0 &&
            formData.weight.length !=0 &&
            formData.bp.length !=0
            ){
                postNewCard()
            } else { 
                Notify.warning("Помилка, ви не заповнили поля")
            }
        
    })
}

const stepSelectTime = () =>{
    modal.innerHTML = `
    <p class="createTitle">Вибір часу</p>
    <div class="cardCreate_body">
    <select id="changeTime" class="selectCreate selectItem">
            <option disabled selected>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
    </select>
    </div>
    <div class="createBtns">
        <button id="btnPrev" class="createBtns_item editCancle">Назад</button>
        <button id="goToForm" class="createBtns_item editSave">Далі</button>
    </div>
    `
    const btnPrev = document.querySelector('#btnPrev')
    btnPrev.addEventListener('click', () =>{
        createCard()
    })
    const btnGoToForm = document.querySelector('#goToForm')
    btnGoToForm.addEventListener('click', () =>{
        const selectTime = document.querySelector('#changeTime')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            time: selectTime.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stemForm()
    })
} 
const createCard = () => { 
    localStorage.setItem('newCard', JSON.stringify({}))
    modal.style.display = 'flex'
    modal.innerHTML = `
    <p class="createTitle">Створити новий запис</p>
    <div class="cardCreate_body">
    <select id="changeDoctor" class="selectCreate selectItem">
        <option disabled  value="none">Зробіть свій вибір</option>
        <option value="Cardiologist">Кардіолог</option>
        <option value="stomatolog">Стоматолог</option>
        <option value="terapevt">Терапевт</option>
    </select>
    </div>
    <div class="createBtns">
        <button class="createBtns_item editCancle">Вийти</button>
        <button id="goToTime" class="createBtns_item editSave">Далі</button>
    </div>
    `
    const btnExit = document.querySelector('.createBtns_item')
    btnExit.addEventListener('click', () =>{
        modal.style.display = 'none'
    })
    const goToTime = document.querySelector('#goToTime')
    goToTime.addEventListener('click', () =>{
        const selectDoctorEl = document.querySelector('#changeDoctor')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            doctor: selectDoctorEl.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stepSelectTime()
    })
}

export default createCard