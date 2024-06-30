import React from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home=()=>{
    const Nav = useNavigate()
    

    const Txt2img=()=>{
        Nav('/txt2img')
    }

    const Txt2vid=()=>{
        Nav('/txt2vid')
    }

    const Txt2aud=()=>{
        Nav('/txt2aud')
    }

    const Aud2txt=()=>{
        Nav('/aud2txt')
    }

    const Prmt2aud=()=>{
        Nav('/prmt2aud')
    }

    const Img2text=()=>{
        Nav('/img2text')
    }

    const Imgedit=()=>{
        Nav('/imgedit')
    }
    return(
        <div>
            <header class="header1">
                <div class="container">
                    <h1>YAMINI</h1>
                    <h1>AI Services</h1>
                    <p>Transforming your world with AI</p>
                </div>
            </header>

            <section class="about">
                <div class="container">
                    <h2>About Yamini AI Services</h2>
                    <p>
                        At Yamini AI Services, we are dedicated to bringing the power of artificial intelligence to your fingertips. 
                        Our platform offers a range of cutting-edge AI services designed to enhance your digital experience. Whether you 
                        need to transform text into stunning images, convert audio to text, or edit images to perfection, we have the tools 
                        you need. Our mission is to empower individuals and businesses to achieve their creative and operational goals 
                        through innovative AI solutions.
                    </p>
                    <p>
                        Our team of experts is constantly working on improving our services and adding new features to ensure that you 
                        have access to the latest advancements in AI technology. We believe in the transformative potential of AI and 
                        are committed to making these powerful tools accessible to everyone.
                    </p>
                </div>
            </section>

            <section class="services">
                <div class="container">
                    <h2>Our Services</h2>
                    <div class="service-grid">
                        <div class="service"
                            onClick={()=>{Txt2img()}}
                        >
                            <img src="https://www.weetechsolution.com/wp-content/uploads/2023/01/imgpsh_fullsize_anim-4.jpg" alt="Text to Image"/>
                            <h3>Text to Image</h3>
                            <p>Generate stunning images from your text descriptions.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Txt2vid()}}
                        >
                            <img src="https://i.ytimg.com/vi/7W3KaQZskK4/maxresdefault.jpg" alt="Text to Video"/>
                            <h3>Text to Video</h3>
                            <p>Create engaging videos from text input.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Txt2aud()}}
                        >
                            <img src="https://fcpxtemplates.com/wp-content/uploads/2019/01/convert2speechAIFF-feature.jpg" alt="Text to Audio"/>
                            <h3>Text to Audio</h3>
                            <p>Convert text to high-quality audio.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Aud2txt()}}
                        >
                            <img src="https://i.pinimg.com/originals/ba/46/64/ba466428dff018ed96cdaf5872a047a1.jpg" alt="Audio to Text"/>
                            <h3>Audio to Text</h3>
                            <p>Transcribe audio files to text.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Prmt2aud()}}
                        >
                            <img src="https://websta.me/wp-content/uploads/2021/06/mlvoice-1536x1155.jpg" alt="Prompt to Audio"/>
                            <h3>Prompt to Audio</h3>
                            <p>Generate audio from prompts.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Img2text()}}
                        >
                            <img src="https://i0.wp.com/www.nepalitrends.com/wp-content/uploads/2020/12/Image-to-text-converter.jpg?resize=880%2C528&ssl=1" alt="Text Extraction"/>
                            <h3>Text Extraction</h3>
                            <p>Extract text from images.</p>
                        </div>
                        <div class="service"
                            onClick={()=>{Imgedit()}}
                        >
                            <img src="https://shotkit.com/wp-content/uploads/2023/05/video-editing-ai-tools.jpg" alt="Image Editing"/>
                            <h3>Image Editing</h3>
                            <p>Remove pimples, dark circles, and blur from photos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="footer">
                <div class="container">
                    <p>Developed by @YAMINI SARIKI</p>
                    <p>&copy; 2024 AI Services. All rights reserved. </p>
                </div>
            </footer>
        </div>
    )
}

export default Home