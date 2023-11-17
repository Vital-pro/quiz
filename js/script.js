// //  сначала найдем кнопку(-и) (кнопки, т.к. их может быть несколько)
// const modalBtns = document.querySelectorAll('.modal__btn');
// // также получим все модалки, их тоже может быть несколько
// const modals = document.querySelectorAll('.modal');
// // body нужно будет убрать scroll
// const body = document.body;

// // function for open modal
// function openModal(element) {
//   element.classList.add('open')
//   body.classList.add('block')
// }

// function closeModal(e) {
//   if (e.target.classList.contains('modal-close') ||
//     // Ниже условие, если крестик - это img, например
//     e.target.closest('.modal-close') ||
//     e.target.classList.contains('modal-bg')
//   ) {
//     e.target.closest('.modal').classList.remove('open');
//     body.classList.remove('block');
//   }
// }

// modalBtns.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     // нужно получить data-attributes кнопки, camelCase
//     let data = e.target.dataset.modalOpen;

//     modals.forEach(modal => {
//       if (
//         modal.dataset.modal == data ||
//         modal.dataset.modal == e.target.closest('.modal__btn').dataset.modalOpen
//         // второе условие, если в кнопке есть img, например
//       ) {
//         openModal(modal);
//       }
//     })

//   })
// })

// modals.forEach(modal => {
//   modal.addEventListener('click', e => closeModal(e))
// })

// window.addEventListener('keydown' , e => {
//   modals.forEach(modal => {
//     if(e.key == 'Escape' && modal.classList.contains('open')) {
//       modal.classList.remove('open');
//       body.classList.remove('block')
//     }
//   })
// })

document.addEventListener('DOMContentLoaded', () => {
  // ! 4.50 начало js code в ролике 14 мин (это 1-й)
  // ! 4.05 начало js code в ролике 10 мин (это 2-й)
  // ! 7.59 начало js code в ролике 32 мин (это 3-й)

  let window = document.body;

  //--- Modal------------
  let modalItemBtn = document.querySelectorAll('[data-trigger-modal]');
  let modal = document.querySelectorAll('[data-modal]');
  let modalContent = document.querySelectorAll('.modal__content');
  let closeModal = document.querySelectorAll('[data-close]');
  let targetBtn;

  function openModal() {
    modalItemBtn.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        targetBtn = element.getAttribute('data-label-modal');

        modal.forEach((element) => {
          let modalId = element.id;

          if (targetBtn === modalId) {
            element.classList.add('active');
            window.style.overflow = 'hidden';
          }
        });
      });
    });
  }

  closeModal.forEach((element) => {
    element.addEventListener('click', () => {
      modal.forEach((element) => {
        element.classList.remove('active');
        window.style.overflow = 'initial';
      });
      if (element.getAttribute('data-trigger-modal')) {
        openModal();
      }
    });
  });

  if (modalItemBtn) {
    openModal();
  }
  //--/- Modal------------

  //-----Reset placeholder input on click
  let formnput = document.querySelectorAll('.input__frm');
  if (formnput) {
    for (let i = 0; i < formnput.length; i++) {
      formnput[i].addEventListener('click', function () {
        let thisElement = this;

        let savePlaceholder = this.getAttribute('placeholder');

        this.setAttribute('placeholder', '');
        document.addEventListener('mouseup', function () {
          thisElement.setAttribute('placeholder', savePlaceholder);
        });
      });
    }
  }
  //-/----Reset placeholder input on click

  //----- Quiz
  let quizForm = document.querySelector('.quiz__form');
  if (quizForm) {
    let prevBtn = quizForm.querySelector('.btnPrev');
    let nextBtn = quizForm.querySelector('.btnNext');
    let quizAll = quizForm.querySelectorAll('.quiz__block');
    let currentQ = quizForm.querySelector('.currentQ');
    let progressQ = quizForm.querySelector('.progress');
    let progress = 0;
    let count = 0;
    let progressPercent = 100 / (quizAll.length - 1);

    initProgress();
    removeBtn();

    // console.log(nextBtn)

    quizForm.querySelector('.allQ').textContent = `${quizAll.length}`;

    nextBtn.addEventListener('click', function () {
      currentQ.textContent++;
      count++;
      progress += Number(progressPercent.toFixed(3));
      initQuiz();
      initProgress();
      removeBtn();
      // blockBtn();
    });

    prevBtn.addEventListener('click', function () {
      count--;
      currentQ.textContent--;
      progress -= Number(progressPercent.toFixed(3));
      initQuiz();
      initProgress();
      removeBtn();
      // blockBtn();
    });

    function initQuiz() {
      quizAll.forEach((element, i) => {
        element.classList.remove('active');
        if (i === count) {
          element.classList.add('active');
        }
      });
    }

    function initProgress() {
      progressQ.style.width = `${progress}%`;
    }

    function removeBtn() {
      if (count === 0) {
        prevBtn.style.display = 'none';
      } else if (count !== 0) {
        prevBtn.style.display = 'block';
      }
      if (count === quizAll.length - 1) {
        nextBtn.style.display = 'none';
      } else if (count !== quizAll.length) {
        nextBtn.style.display = 'block';
      }
    }
  }
  //--/-- Quiz
  // !--finish 1 video----------

  // ------Upgrate form
  function blockBtn() {
    let nextBtn = document.querySelector('.btnNext');
    let select = quizForm.querySelector('.select');
    let phone = quizForm.querySelector('#phone');
    let gender = quizForm.querySelectorAll('[name = "gender"]');
    let nameInput = quizForm.querySelector('[name = "forName"]');
    let skill = quizForm.querySelectorAll('[name = "skill"]');
    let contact = quizForm.querySelectorAll('.contact');
    let nextBtnParent = nextBtn.parentElement;
    let formBtn = quizForm.querySelector('.form__btn');
    let counterGender = gender.length;
    let counterSkill = skill.length;

    let quizAll = quizForm.querySelectorAll('.quiz__block');
    let count = 0;

    if (count === 0) {
      if (!nameInput.value || nameInput.value === '') {
        nextBtnParent.classList.add('blockBtn');
      } else {
        nextBtnParent.classList.remove('blockBtn');
      }

      nameInput.addEventListener('keyup', function () {
        if (!this.value || this.value === '') {
          nextBtnParent.classList.add('blockBtn');
        } else {
          nextBtnParent.classList.remove('blockBtn');
        }
      });
    }

    if (count === 1) {
      function addSelectClass() {
        if (select.options.selectedIndex === 0) {
          nextBtnParent.classList.add('blockBtn');
        } else {
          nextBtnParent.classList.remove('blockBtn');
        }
      }
      addSelectClass();

      select.addEventListener('click', function () {
        addSelectClass();
      });
    }

    if (count === 2) {
      gender.forEach((element) => {
        function addGenderClass() {
          if (element.checked) {
            nextBtnParent.classList.remove('blockBtn');
            counterGender++;
          } else {
            nextBtnParent.classList.add('blockBtn');
            counterGender--;
          }
          if (counterGender > 0) {
            nextBtnParent.classList.remove('blockBtn');
          }
        }
        addGenderClass();

        element.addEventListener('click', function () {
          addGenderClass();
        });
      });
    }

    if (count === 3) {
      skill.forEach((element, i, arr) => {
        function addSkillClass() {
          if (element.checked) {
            counterSkill++
            nextBtnParent.classList.remove('blockBtn');
          } else {
            nextBtnParent.classList.add('blockBtn');
            counterSkill--
          }
          if (counterSkill > 0) {
            nextBtnParent.classList.remove('blockBtn');
          }
        }

        addSkillClass();

        element.addEventListener('click', function () {
          addSkillClass();
        });
      });
    }

    if (count === quizAll.length - 1) {
      contact.forEach((element) => {
        if (!element.value || element.value === '') {
          formBtn.classList.add('blockBtn');
        } else {
          formBtn.classList.remove('blockBtn');
        }

        element.addEventListener('keyup', function () {
          if (!element.value || element.value === '') {
            formBtn.classList.add('blockBtn');
          } else {
            formBtn.classList.remove('blockBtn');
          }
        });
      });
    }

    // -----Mask phone

    phone.addEventListener('click', function () {
      if (!this.value) {
        phone.value = '+';
      }
    });
    let old = 0;

    phone.addEventListener('keydown', function () {
      let curlen = phone.value.length;
      if (curlen < old) {
        old--;
        return;
      }
      if (curlen === 3) phone.value = phone.value + '(';
      if (curlen === 7) phone.value = phone.value + ')-';
      if (curlen === 12) phone.value = phone.value + '-';
      if (curlen === 15) phone.value = phone.value + '-';
      if (curlen > 17)
        phone.value = phone.value.substring(0, phone.value.length - 1);
      old++;
    });
  }

  blockBtn();

  // ---Select
  // let findSelect = document.querySelector('.select');
  // if (findSelect) {
    // const CustomSelect = function (e) {
    //   let mainInitId = e.elem ? document.getElementById(e.elem) : e.elem,
    //     optGroup = mainInitId.querySelectorAll('optgroup'),
    //     options = mainInitId.options,
    //     selectedIndex = options[mainInitId.selectedIndex],
    //     dataIndexCount = 0,
    //     dataImgCount = 0,
    //     createSelectLi,
    //     createSelectImg,
    //     prefixContainer = 'custom',
    //     titleClass = 'select__title',
    //     selectedClass = 'selected',
    //     selectContainerClass = 'custom__select',
    //     selectUlClass = 'select__list',
    //     optGroupClass = 'select__optgroup',
    //     imgClass = 'select__img',
    //     imgLazyClass = 'lazy',
    //     titleClassActive = 'active',
    //     ulOpenClass = 'open';

    //   if (localStorage.getItem('selected')) {
    //     mainInitId.selectedIndex = localStorage.getItem('selected');
    //   }

    //   const createSelectContainer = document.createElement('div');
    //   createSelectContainer.className = selectContainerClass;
    //   if (mainInitId.id)
    //     createSelectContainer.id = `${prefixContainer} ${mainInitId.id}`;

    //   let creataSelectBtn = document.createElement('button');
    //   creataSelectBtn.setAttribute('type', 'button');
    //   let btnSpan = document.createElement('span');
    //   creataSelectBtn.appendChild(btnSpan);
    //   creataSelectBtn.className = titleClass;
    //   btnSpan.textContent = options[0].textContent;

    //   if (selectedIndex.getAttribute('data-srcImg')) {
    //     let selectedImg = document.createElement('img');
    //     selectedImg.setAttribute(
    //       'src',
    //       `${selectedIndex.getAttribute('data-srcImg')}`
    //     );
    //     creataSelectBtn.appendChild(selectedImg);
    //   }

    //   const createSelectUl = document.createElement('ul');
    //   createSelectUl.className = selectUlClass;

    //   if (optGroup.length > 0) {
    //     for (let p = 0; p < optGroup.length; p++) {
    //       const createOptGroupItem = document.createElement('div');
    //       createOptGroupItem.classList.add(optGroupClass);
    //       createOptGroupItem.innerText = optGroup[p].label;
    //       createSelectUl.appendChild(createOptGroupItem);
    //       createLi(optGroup[p].querySelectorAll('option'));
    //     }
    //   } else createLi(options);

    //   function createLi(e) {
    //     for (let t = 0; t < e.length; t++) {
    //       createSelectLi = document.createElement('li');
    //       let liSpan = document.createElement('span');
    //       createSelectLi.appendChild(liSpan);
    //       liSpan.textContent = e[t].textContent;

    //       createSelectLi.setAttribute('data-value', e[t].value);
    //       createSelectLi.setAttribute('data-index', `${dataIndexCount++}`);
    //       createSelectUl.appendChild(createSelectLi);

    //       if (selectedIndex.textContent === e[t].textContent) {
    //         createSelectLi.classList.add(selectedClass);
    //         btnSpan.textContent = e[t].textContent;
    //       }

    //       if (options[dataImgCount++].getAttribute('data-srcImg')) {
    //         let srcImg = e[t].getAttribute('data-srcImg');
    //         createSelectImg = document.createElement('img');
    //         createSelectImg.classList.add(imgClass, imgLazyClass);
    //         createSelectImg.setAttribute('src', srcImg);
    //         createSelectLi.appendChild(createSelectImg);
    //       }
    //     }
    //   }

    //   createSelectUl.addEventListener('click', (e) => {
    //     const target = e.target;

    //     if ('DIV' === target.tagName) {
    //     } else {
    //       creataSelectBtn.innerHTML = target.closest('li').innerHTML;
    //       mainInitId.options.selectedIndex = +target
    //         .closest('li')
    //         .getAttribute('data-index');

    //       for (let a = 0; a < options.length; a++) {
    //         createSelectUl
    //           .querySelectorAll('li')
    //           [a].classList.remove(selectedClass);
    //         target.closest('li').classList.add(selectedClass);
    //       }
    //       // LocalStorage??
    //     }
    //   });

    //   creataSelectBtn.addEventListener('click', function () {
    //     createSelectUl.classList.toggle(ulOpenClass);
    //     creataSelectBtn.classList.toggle(titleClassActive);
    //   });

    //   document.addEventListener('mouseup', function (e) {
    //     let isClickInside = creataSelectBtn.contains(e.target);
    //     if (!isClickInside && !e.target.classList.contains(optGroupClass)) {
    //       createSelectUl.classList.remove(ulOpenClass);
    //       creataSelectBtn.classList.remove(titleClassActive);
    //     }
    //   });

    //   createSelectContainer.appendChild(creataSelectBtn);
    //   createSelectContainer.appendChild(createSelectUl);
    //   mainInitId.parentNode.insertBefore(createSelectContainer, mainInitId);
    //   // mainInitId.style.display = 'none';
    // };
  

    // new CustomSelect({
    //   elem: 'select',
    // });
  // }
  // -/-Select

  const form = document.getElementById('form');

  form.querySelector('.hiddenFormTitle').value =
    form.querySelector('.my__formTitle').textContent;

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let notification = document.querySelector('.notification__text');

    let formData = new FormData(form);
    if (error === 0) {
      form.classList.add('_sending');
      notification.textContent = '';
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        notification.textContent = result.message;
        notification.style = 'color: green;';
        form.reset();
        form.classList.remove('_sending');
      } else {
        notification.textContent = result.message;
        notification.style = 'color: red;';
        form.classList.remove('_sending');
      }
    } else {
      notification.textContent = 'Заполните все поля';
      notification.style = 'color: red';
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
});
