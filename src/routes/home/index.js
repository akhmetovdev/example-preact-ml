import ml5 from 'ml5';
import { Component } from 'preact';
import style from './style';

class Home extends Component {
  state = {
    img: null,
    isLoaded: false
  };

  componentDidMount() {
    this.classifier = ml5.imageClassifier('MobileNet', () => {
      this.setState({ isLoaded: true });
    });
  }

  handleRef = imgDom => {
    this.imgDom = imgDom;
  };

  handleChange = e => {
    const [img] = e.target.files;

    if (img) {
      this.setState({ img: URL.createObjectURL(img) });
      setTimeout(() => this.predict(), 100);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  predict = () => {
    this.classifier.predict(this.imgDom, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({ result: result[0] });
        console.log(result[0]);
      }
    });
  };

  render({}, { img, isLoaded, result }, {}) {
    const { className: name = '', probability = 0 } = result || {};
    const percent = Number(probability * 100).toFixed(2);

    return (
      <div class={style.home}>
        <h1>Machine Learning with ml5.js</h1>
        {isLoaded ? (
          <form class={style.form} onSubmit={this.handleSubmit}>
            {img && (
              <img
                ref={this.handleRef}
                class={style.img}
                src={img}
                alt="image"
              />
            )}
            <input type="file" accept="image/*" onChange={this.handleChange} />
            {result && (
              <p>
                Skynet think this is <b>{name}</b> with a confidence of{' '}
                <b>{percent}%</b>
              </p>
            )}
          </form>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

export default Home;
