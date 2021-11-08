import lwsImg from '../../images/lws_3-2.jpg'
import huwatImg from '../../images/huwat_3-2.jpg'
import lucinskiImg from '../../images/lucinski_3-2.jpg'
import eismanufakturImg from '../../images/kleine-eismanufaktur_3-2.jpg'
import nureinbergImg from '../../images/nureinberg_3-2.jpg'
import lwsVideo from '../../images/lws.mp4'
import nureinbergVideo from '../../images/nureinberg.mp4'

const data = {
  lws: {
    name: 'Lightweight System',
    category: '3D, Web Development',
    img: lwsImg,
    videoSrc: lwsVideo,
    link: 'https://lightweight-system.com',
  },
  huwat: {
    name: 'HuWat',
    category: 'Branding, Web Development',
    img: huwatImg,
    link: 'https://huwat.com',
  },
  lucinski: {
    name: 'Lucinski',
    category: 'Web Development',
    img: lucinskiImg,
    link: 'https://lucinski.de',
  },
  eismanufaktur: {
    name: 'Kleine Eismanufaktur',
    category: 'Web Development, Graphic Design',
    img: eismanufakturImg,
    link: 'https://kleine-eismanufaktur.de',
  },
  nureinberg: {
    name: 'NurEinBerg',
    category: 'Brand Development, Web Development',
    videoSrc: nureinbergVideo,
    img: nureinbergImg,
    link: 'https://nureinberg.de',
  },
}

export default data
