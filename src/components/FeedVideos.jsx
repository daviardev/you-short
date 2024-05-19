import VideoPlayer from './VideoPlayer'

const VIDEOS = [
  {
    id: 1,
    author: 'penelope',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod #food #omg #divertido #fun #epic #hashtag',
    likes: 123,
    comments: 321,
    shares: 12,
    songName: 'Problemón - Alvaro Diaz & Rauw Alejandro',
    avatar: '/images/image.jpeg',
    src: '/Download.mp4',
    albumCover: '/images/cover.jpg'
  },
  {
    id: 2,
    author: 'lavacalola',
    description: 'lorem ipsum dolorectetur adipiscing, tempor incididunt ut labore et dolore magna aliqua. #food #omg #divertido #fun #epic #hashtag',
    likes: 321,
    comments: 123,
    shares: 23,
    songName: 'sonido original - pablitocastilloo',
    avatar: '/images/image.jpeg',
    src: '/Download.mp4',
    albumCover: '/images/cover.jpg'
  },
  {
    id: 3,
    author: 'fumanchu',
    description: 'tempor incididunt ut labore et dolore magna aliqua. #food #omg #divertido #fun #epic #hashtag',
    likes: 321,
    comments: 123,
    shares: 23,
    songName: 'sonido original - A L E X 🥀',
    avatar: '/images/image.jpeg',
    src: '/Download.mp4',
    albumCover: '/images/cover.jpg'

  }
]

export default function FeedVideos () {
  return VIDEOS.map(video => (
    <div
      key={video.id}
      className='w-full h-full snap-center'
    >
      <VideoPlayer {...video} />
    </div>
  ))
}
