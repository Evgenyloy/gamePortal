import PortalService from '../../services/services';

const Test = () => {
  const a = new PortalService();
  let b;
  const cont = a
    .getNews()
    .then((res) => res.slice(0, 1))
    .then((res) => (b = res[0].article_content))

    .catch();

  let elem = document.createElement('div');
  elem.innerText = b;
  /* console.log(elem); */
  var newDoc = new DOMParser().parseFromString(b, 'text/html');
  let p = newDoc.querySelector('p');
  console.log(p);
  /*function createMarkup() {
          return { __html: article_content };
        }
 dangerouslySetInnerHTML={createMarkup()} */
};

export default Test;
