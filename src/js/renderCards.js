import openCard from './openCard'
import editCard from './editer'
import createCard from "./createCard";
import filter from "./filter"; 

import instance from './Assets/axiosInstances';
import { createRecordsButton, exitButton } from './Assets/createRecondsBtn';

const records = document.querySelector("#records");
const logInButton = document.querySelector("#logInButton");

const renderCards = () => {
    const token = localStorage.getItem("token");
    instance.get("/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        filter()
        if (res.data.length >= 0) {
            logInButton.innerHTML = `<p class="header_right_cabinet">Доброго дня!</p>
            <button class="header_right_exitButton" button-exit>Вийти</button>`
            document.querySelector("button[button-exit]").onclick = exitButton
            //
            records.innerHTML = `
            ${createRecordsButton()}
            <p class="header_center_table_title">Список Ваших записів</p>
            <table class="header_center_table_internal">
              <thead>
                <tr>
                  <th class="header_center_table_internal_title">ПІБ</th>
                  <th class="header_center_table_internal_title">Доктор</th>
                  <th class="header_center_table_internal_title">Терміновість</th>
                  <th class="header_center_table_internal_title">Дія</th>
                </tr>
              </thead>
              <tbody id="tbody-cards">
              </tbody>
            </table>`
            let tbody = document.querySelector("#tbody-cards");
            res.data.forEach(card => {
                let resDoctor = card.doctor
                let doctor 
                switch(resDoctor) {
                    case 'terapevt': 
                    doctor = "Терапевт"
                    break
                    case 'stomatolog': 
                    doctor = "Стоматолог"
                    break
                    case 'cardiologist': 
                    doctor = "Кардіолог"
                    break
                    default: doctor = ""
                }
                tbody.innerHTML += `
                    <tr id="card${card.id}" class="cardID" data-id="${card.id}">
                        <td>${card.name}</td>
                        <td>${doctor}</td>
                        <td>${card.time}</td>
                        <td>
                            <button class="btn btn-info btnOpenCard" data-id="${card.id}"><i style="color: white" class="fa-solid fa-expand"></i></button>
                            <button class="btn btn-warning btnEditCard" data-id="${card.id}"><i style="color: white" class="fa-solid fa-pen-to-square"></i></button>
                            <button id="btnDelete" class="btn btn-danger" data-id="${card.id}"><i style="color: white" class="fa-solid fa-x"></i></button>
                        </td>
                    </tr>
                `
                // удаляем карточку при нажатии на крестик
                let btnDelete = document.querySelectorAll("#btnDelete");
                btnDelete.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const deletingID = btn.getAttribute('data-id');
                        instance.delete(`/${deletingID}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                            let listCards = document.querySelectorAll('.cardID')
                            listCards.forEach((cardItem => {
                                if (cardItem.getAttribute('data-id') === deletingID) {
                                    cardItem.remove()
                                }
                            }))
                        })
                    })
                })
            })
            const btnsEdit = document.querySelectorAll('.btnEditCard');
            btnsEdit.forEach((el) => {
                el.addEventListener('click', () => {
                let cardId = el.getAttribute('data-id');
                    editCard(cardId)
                })
            })
            const btnsOpen = document.querySelectorAll('.btnOpenCard');
            btnsOpen.forEach((btnItem) => {
                btnItem.addEventListener('click', () => {
                    let cardId = btnItem.getAttribute('data-id');
                    openCard(cardId);
                })
            })

        } else {
            records.innerHTML += `${createRecordsButton()}`
        }
        let btnCreate = document.querySelector('#recordsButton')
        btnCreate.addEventListener('click', () => {
            createCard()
        })
    })
}

export default renderCards