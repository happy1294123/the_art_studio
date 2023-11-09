import TheTitle from '@/components/TheTitle'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const aerialCourseTypeList = [
  {
    title: '入門空瑜',
    desc: '0基礎，新手友善課程，或曾上過空瑜課程，但有中斷學習的學員，建議0-3個月以上空瑜課程經驗。'
  },
  {
    title: '初階空瑜',
    desc: '建議3-6個月以上空瑜課程經驗。'
  },
  {
    title: '中階空瑜',
    desc: '建議6-9個月以上空瑜課程經驗。'
  },
  {
    title: '進階空瑜',
    desc: '建議1年以上空瑜課程經驗。'
  },
  {
    title: '親子空瑜',
    desc: '透過親子雙人動作，使父母與孩子透過肢體接觸、眼神注視...等來傳遞彼此的情感，培養孩子肢體創造力及想像力，提升對於身體的認知、安全感、成就感、自信心，進而調節孩子的情緒，增進親子關係與默契度。'
  },
  {
    title: '兒童空瑜',
    desc: '年齡層5-12歲。以趣味、循序漸進的方式引導孩子接觸掛布，由陌生至熟悉，透過肌耐力、柔軟度練習，增加自信與享受樂趣。'
  },
]

const groundCourseTypeList = [
  {
    title: '基礎瑜伽（ basic Yoga ）',
    fit: '0基礎 新手友善課程',
    desc: '瑜伽屬於溫和性的全身運動，透過入門體位動作練習全身伸展，對沒有運動基礎的學員來說，可以幫助調整骨骼與矯正日常累積的不良姿勢，同時增加基礎代謝，舒緩緊繃壓力，提升睡眠品質。'
  },
  {
    title: '哈達瑜伽（ Hatha Yoga ）',
    fit: '各程度學員皆適合',
    desc: '歷史最悠久的瑜伽，也是現今比較普遍的瑜伽。「哈」在梵語中代表太陽；「達」則是月亮，兩者具有陰陽平衡之意，「哈達」一詞也詮釋了力量的意思。著重「感受」，體驗基礎體位給予的感受，藉由呼吸、體位和冥想來達到肌肉拉伸與身心放鬆。除了有簡單的初階動作適合瑜伽新手入門，也有較高難度的動作可以挑戰，適合所有族群學習，尤其日常壓力大、容易緊張、肌肉緊繃的學員。'
  },
  {
    title: '陰瑜伽（ Yin Yoga ）',
    fit: '各程度學員皆適合（特別適合焦慮、髖關節僵硬者）',
    desc: '強調下半身的穩定性及深度拉伸，主要透過拉筋伸展來活絡僵硬的身體筋骨，並疏通血氣不順的氣節和緊繃筋膜。陰瑜伽的體位動作多是坐姿和躺姿，拉伸停留時間常長達3～5分鐘，有許多加強髖部、骨盆的下身動作，都具有很好的舒緩、放鬆效果。日常想練習冥想、打坐、平撫焦慮或筋骨僵硬的學員很適合從陰瑜伽入門。'
  },
  {
    title: '瑜伽輪（Learning Wheel Yoga）',
    fit: '各程度學員皆適合（特別適合日常駝背、腰痠背痛者）',
    desc: '又稱為「瑜珈圈」或「達摩輪」，透過在瑜珈練習中輔助伸展拉筋的輪圈，能創造更多伸展空間， 放鬆、伸展的同時，也尋找支撐穩定訓練平衡感，提高身體靈活性，改善肩頸背部疼痛。'
  },
  {
    title: '皮拉提斯（Pilates）',
    fit: '各程度學員皆適合',
    desc: '最初是為了讓受傷士兵恢復肌力的復健運動，由專注、呼吸、核心、控制、精確與流暢，六大元素組成，針對不同的生活習慣，加入多元化的指導，增加脊椎活動度、重新檢視軀幹的穩定排列，以及動作靈活度...等，過程中核心肌群參與比瑜伽更高，更著重於核心肌群的鍛鍊，達到美化體態的效果。'
  },
  {
    title: '柔軟度開發',
    fit: '各程度學員皆適合',
    desc: '融合舞蹈、瑜珈、人體解剖學概念，在不受傷的前提下，告別僵硬的身體，使氣血通順，增加身體韌性、柔軟度，打開關節活動空間，降低日常受傷機率，提升運動表現，讓身心獲得適當舒壓，肌肉線條更加修長。'
  },
  {
    title: '雕塑課程（Bodyweight Training）',
    fit: '各程度學員皆適合',
    desc: '以肌力訓練為基礎，透過簡單的動作創造出不同的訓練模式，增加肌力、心肺功能，提高基礎代謝率，燃脂的同時，達到改善體態與雕塑身材的功效，在安全指導之下，給予不同主題的彈性變化，獲得更佳的運動表現。'
  },
  {
    title: '芭蕾雕塑（barre）',
    fit: '各程度學員皆適合',
    desc: '以芭蕾為基礎元素，結合健身、有氧、皮拉提斯，透過徒手或搭配不同的輔助器具做訓練。課程屬於綜合性訓練課程，可加強肌肉肌耐力、穩定性、身體協調平衡，同時雕塑如同芭蕾舞者般地優美修長線條。'
  },
  {
    title: '倒立平衡（Handstand）',
    fit: '各程度學員皆適合',
    desc: '課程將由入門動作為基礎，透過核心、全身肌力，使身體保持穩定平衡狀態，能夠增加手部握力與上肢力量，將血液集中在頭部，同時刺激臉部的微血管，讓氣色更好、促進新陳代謝、調節腦垂體，讓身體更有效率地產生健康荷爾蒙，增加腦部的氧氣供應的同時，可以讓精神變得更好。'
  },
]

export default function CourseIntroPage() {
  return (
    <div className='max-w-screen-md mx-auto'>
      <TheTitle>課程介紹</TheTitle>
      <Card>
        <CardHeader>
          <CardTitle className='mb-2'>空中瑜伽 ( Aerial Yoga )</CardTitle>
          <CardDescription>也被稱為「反重力瑜伽」，融合傳統瑜伽姿勢、舞蹈、皮拉提斯、馬戲等現代動作，以搭配吊床或掛布懸空進行，部分地面較難達成動作，可藉由空瑜輔助練習。看似優雅，實則非常考驗核心力量、身體動作協調與穩定性，可提升核心力量、改善體態、練習平衡感。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {aerialCourseTypeList.map(course => (
              <li key={course.title} className='mb-2 rounded-2xl p-2' id={course.title}>
                <div className="flex">
                  <div className='w-2 h-2 bg-primary/50 rounded-full my-auto mr-2'></div>
                  <span className='text-primary' >
                    {course.title}
                  </span>
                </div>
                <p className='ml-4'>{course.desc}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card >
      <br />
      <Card>
        <CardHeader>
          <CardTitle>地面課程</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {groundCourseTypeList.map(course => (
              <li key={course.title} className='mb-2 rounded-2xl p-2' id={`${course.title.split('（')[0]}`}>
                <div className="flex">
                  <div className='w-2 h-2 bg-primary/50 rounded-full my-auto mr-2'></div>
                  <span className='text-primary'>{course.title}</span>
                </div>
                <p className='ml-4 text-gray-500'>{course.fit}</p>
                <p className='ml-4'>{course.desc}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
} 
