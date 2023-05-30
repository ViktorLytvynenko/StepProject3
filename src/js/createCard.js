import instance from "./Assets/axiosInstances"
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import renderCards from "./renderCards";

const modal = document.querySelector('.cardCreate')

class Visit {
    constructor(title, name, age, weight, bp, description) {
        this.title = title;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.bp = bp;
        this.description = description;
    }
}

const postNewCard = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const newCard = JSON.parse(localStorage.getItem("newCard"));
    if (!newCard.title) {
        Notify.warning('Введіть назву')
    }
    if (!newCard.name) {
        Notify.warning('Введіть ПІБ')
    }
    if (!Number.isInteger(parseInt(newCard.bp)) || !Number.isInteger(parseInt(newCard.weight)) || !Number.isInteger(parseInt(newCard.age))) {
        Notify.warning('Введіть правильний тиск, вагу і вік')
    } else {
        instance.post('/', newCard, config)
            .then((res) => {
                if (res.status == 200) {
                    modal.innerHTML = `
                    <p class="createTitle">Нова картка створена</p>
                `

                    setTimeout(() => {
                        renderCards()
                        modal.style.display = 'none'
                    }, 2500)
                }
            })
    }
}

const exitButton = () => {
    let closeModalButton = document.querySelector('#closeModalButton')
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}

class SetCardiologist extends Visit {
    constructor(title, name, age, weight, bp, description, contraindication, lastVisit) {
        super(title, name, age, weight, bp, description);
        this.contraindication = contraindication;
        this.lastVisit = lastVisit;
    }

    static setForm() {
        return `
      <li class="editItem">
        <p class="editParam">Протипоказання</p>
        <input id="form" class="editInput" type="text" formName="contraindication" placeholder="Напишіть протипоказання">
      </li>
      <li class="editItem">
        <p class="editParam">Дата останнього візиту</p>
        <input id="formTitle" class="editInput" type="date" formName="lastVisit" >
      </li>
    `;
    }
}

class SetStomatolog extends Visit {
    constructor(title, name, age, weight, bp, description, phoneNumber, insurance) {
        super(title, name, age, weight, bp, description);
        this.phoneNumber = phoneNumber;
        this.insurance = insurance;
    }

    static setForm() {
        return `
      <li class="editItem">
        <p class="editParam">Номер телефону</p>
        <input id="form" class="editInput" type="text" formName="phoneNumber" placeholder="Напишіть ваш номер телефону">
      </li>
      <li class="editItem">
        <p class="editParam">Номер страхової картки</p>
        <input id="form" class="editInput" type="text" formName="insurance" placeholder="Напишіть номер строхової картки">
      </li>
    `;
    }
}

class SetTerapevt extends Visit {
    constructor(title, name, age, weight, bp, description, address, conclusion) {
        super(title, name, age, weight, bp, description);
        this.address = address;
        this.conclusion = conclusion;
    }

    static setForm() {
        return `
      <li class="editItem">
        <p class="editParam">Адрес</p>
        <input id="form" class="editInput" type="text" formName="address" placeholder="Напишіть ваш адрес проживання">
      </li>
      <li class="editItem">
        <p class="editParam">Висновок</p>
        <input id="form" class="editInput" type="text" formName="conclusion" placeholder="Напишіть висновок">
      </li>
    `;
    }
}

const stemForm = (doctor) => {
    let doctorForm
    switch (doctor) {
        case 'cardiologist':
            doctorForm = SetCardiologist.setForm()
            break;
        case 'stomatolog':
            doctorForm = SetStomatolog.setForm()
            break;
        case 'terapevt':
            doctorForm = SetTerapevt.setForm()
            break;
        default:
            doctorForm = '';
    }
    modal.innerHTML = `
    <p class="createTitle">Заповнення форми</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <ul class="editList">

        <li class="editItem">
            <p class="editParam">Назва</p>
            <input id="formTitle" class="editInput" type="text" formName="title" placeholder="Напишіть назву візиту">
        </li>
        <li class="editItem">
            <p class="editParam">ПІБ</p>
            <input id="formTitle" class="editInput" type="text" formName="name" placeholder="Напишіть ПІБ">
        </li>
        ${doctorForm}
        <li class="editItem">
            <p class="editParam">Вік</p>
            <input id="formAge" class="editInput" type="text" formName="age" placeholder="Напишіть вік">
        </li>
        <li class="editItem">
            <p class="editParam">Вага</p>
            <input id="formWeight" class="editInput" type="text" formName="weight" placeholder="Напишіть вагу">
        </li>
        <li class="editItem">
            <p class="editParam">BP</p>
            <input id="formBp" class="editInput" type="text" formName="bp" placeholder="Напишіть тиск">
        </li>
        <li class="editItem">
            <textarea id="formTitle" class="editInput" type="text" formName="description" placeholder="Напишіть опис візиту"></textarea>
        </li>
    </ul>
    </div>
    <div class="createBtns">
        <button id="btnPrevToSelect" class="createBtns_item editCancle">Назад</button>
        <button id="btnSaveCard" class="createBtns_item editSave">Створити</button>
    </div>
    `
    const btnPrev = document.querySelector('#btnPrevToSelect')
    btnPrev.addEventListener('click', () => {
        stepSelectTime()
    })
    const btnSaveCard = document.querySelector('#btnSaveCard')
    btnSaveCard.addEventListener('click', () => {
        const formArr = document.querySelectorAll('.editInput')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard
        }
        formArr.forEach((el) => {
            newCard = {
                ...newCard,
                [el.getAttribute('formName')]: el.value ? el.value : ''
            }
        })
        localStorage.setItem('newCard', JSON.stringify(newCard))
        postNewCard()

    })

    exitButton();
}

const stepSelectTime = () => {
    modal.innerHTML = `
    <p class="createTitle">Вибір часу</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <select id="changeTime" class="selectCreate selectItem">
            <option disabledТерміновість візиту</option>
                <option selected>Короткий запис</option>
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
    btnPrev.addEventListener('click', () => {
        createCard()
    })
    const btnGoToForm = document.querySelector('#goToForm')
    btnGoToForm.addEventListener('click', () => {
        const selectTime = document.querySelector('#changeTime')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            time: selectTime.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stemForm(newCard.doctor)
    })

    exitButton();
}
const createCard = () => {
    localStorage.setItem('newCard', JSON.stringify({}))
    modal.style.display = 'flex'
    modal.innerHTML = `
    <p class="createTitle">Створити новий запис</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <select id="changeDoctor" class="selectCreate selectItem">
        <option disabled value="none">Зробіть свій вибір</option>
        <option value="cardiologist">Кардіолог</option>
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
    btnExit.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    const goToTime = document.querySelector('#goToTime')
    goToTime.addEventListener('click', () => {
        const selectDoctorEl = document.querySelector('#changeDoctor')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            doctor: selectDoctorEl.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stepSelectTime()
    })

    exitButton();

}

export default createCard