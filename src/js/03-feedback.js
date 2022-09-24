import throttle from 'lodash.throttle';

const feedbackFormRef = document.querySelector('.feedback-form');

const FORM_STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

inititPage();

const throttledOnInputHandle = throttle(onInputHandle, 500);
feedbackFormRef.addEventListener('input', throttledOnInputHandle);

function onInputHandle(event) {
  const { name, value } = event.target;
  try {
    let saveDataForm = load(FORM_STORAGE_KEY);
    saveDataForm = saveDataForm ? saveDataForm : {};
    saveDataForm[name] = value;
    save(FORM_STORAGE_KEY, saveDataForm);
  } catch (error) {
    console.error(error);
  }
}

function inititPage() {
  const saveDataForm = load(FORM_STORAGE_KEY);
  console.log(saveDataForm);
  if (!saveDataForm) {
    return;
  }
  Object.entries(saveDataForm).forEach(([name, value]) => {
    feedbackFormRef.elements[name].value = value;
  });
}

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(FORM_STORAGE_KEY);
};

feedbackFormRef.addEventListener('submit', handleSubmit);
