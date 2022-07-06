import React from 'react';
import ReactDOM from 'react-dom';
import * as htmlToImage from 'html-to-image';
import './summons.css';
import Banner from '../banner/Banner';
import Pitymodal from '../pitymodal/Pitymodal';
import SmallBanner from '../smallBanner/SmallBanner';
import Character from '../character/Character';
import EliBannerSmall from '../banners/FestEli_Banner_small.png'
import EliBanner from '../banners/FestEli_Banner.png';
import BrunhildBanner from '../banners/SeasonalBrunhild_Banner.png'
import BrunhildBannerSmall from '../banners/SeasonalBrunhild_Banner_small.png'
import FreyrBanner from '../banners/Freyr_Banner.png'
import FreyrBannerSmall from '../banners/Freyr_Banner_small.png'

export default function Summons() {
    const publicFolder = process.env.PUBLIC_URL

    const [drawing, setDrawing] = React.useState(false);

    const [isMulti, setIsMulti] = React.useState(true);

    const [currentBanner, setCurrentBanner] = React.useState({banner : EliBanner, maxPity: 900, gemsSpent: 0, selectablePity: true});

    const [resultCharacters, setResultCharacters] = React.useState([])

    const [usedDiamonds, setUsedDiamonds] = React.useState({banner1: 0, banner2: 0, banner3: 0})

    const [pityReached, setPityReached] = React.useState({isPity: false, pityType: 'sidePity'})

    const [pityCharacters, setPityCharacter] = React.useState({sidePityCharacter: [publicFolder + '/units/AlioniR.png'], maxPityCharacters: [publicFolder + '/units/AlioniR.png']})

    const [openPityModal, setOpenPityModal] = React.useState(false)

    const [pitySelected, setPitySelected] = React.useState(false)

    const [selectedPity, setSelectedPity] = React.useState({character: [], isSelected: false})

    const [pityClaimed, setPityClaimed] = React.useState({pity1: false, pity2: false})

    const ref = React.useRef()

    React.useEffect(() => {
        if (isMulti) {
            if ((currentBanner.gemsSpent % 300) < 30 && currentBanner.gemsSpent !== 0 && drawing) {
                let pity = detectPity(currentBanner.maxPity, currentBanner.gemsSpent)
                setPityReached(prevState => ({
                    ...prevState,
                    pityType: pity,
                    isPity: true
                }))
            }
            if ((currentBanner.gemsSpent % currentBanner.maxPity) > 0 && (currentBanner.gemsSpent % currentBanner.maxPity) <= 30) {
                setPityClaimed({pity1: false, pity2: false})
            }
        }
        else {
            if ((currentBanner.gemsSpent % 300) < 3 && currentBanner.gemsSpent !== 0 && drawing) {
                let pity = detectPity(currentBanner.maxPity, currentBanner.gemsSpent)
                setPityReached(prevState => ({
                    ...prevState,
                    pityType: pity,
                    isPity: true
                }))
            }
            if ((currentBanner.gemsSpent % currentBanner.maxPity) > 0 && (currentBanner.gemsSpent % currentBanner.maxPity) <= 3) {
                setPityClaimed({pity1: false, pity2: false})
            }
        }
    }, [currentBanner.gemsSpent, currentBanner.maxPity, isMulti, drawing])

    let rCharacters = [publicFolder + '/units/AlioniR.png', publicFolder + '/units/GolgiusR.png', publicFolder + '/units/HugoR.png', publicFolder + '/units/JudeR.png', publicFolder + '/units/MarmasR.png', publicFolder + '/units/RuinR.png', publicFolder + '/units/SimonR.png', publicFolder + '/units/TaizooR.png', publicFolder + '/units/TwigoR.png']

    let srCharacters = [publicFolder + '/units/ArdenSR.png', publicFolder + '/units/ArthurSR.png', publicFolder + '/units/BanSR.png', publicFolder + '/units/BlueGilSR.png', publicFolder + '/units/BlueHowzerSR.png', publicFolder + '/units/BlueJerichoSR.png', publicFolder + '/units/CainSR.png', publicFolder + '/units/DianeSR.png', publicFolder + '/units/DogedoSR.png', publicFolder + '/units/Dreyfus2SR.jpg', publicFolder + '/units/DreyfusSR.png', publicFolder + '/units/FreesiaSR.png', publicFolder + '/units/GowtherSR.png', publicFolder + '/units/GreenElihawkSR.png', publicFolder + '/units/GreenGilSR.png', publicFolder + '/units/GreenHowzerSR.png', publicFolder + '/units/GriamoreRedSR.png', publicFolder + '/units/GriamoreSR.png', publicFolder + '/units/GuilaSR.png', publicFolder + '/units/GustavSR.png', publicFolder + '/units/HedricksonSR.png', publicFolder + '/units/JilianSR.png', publicFolder + '/units/MeliSR.png', publicFolder + '/units/RedElihawkSR.png', publicFolder + '/units/RedEliSR.png', publicFolder + '/units/RedJerichoSR.png', publicFolder + '/units/SlaterSR.png', publicFolder + '/units/VivianSR.png', publicFolder + '/units/WeinheidtSR.png']

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function probability() {
        return Math.random() * 99;
    }

    function detectPity(bannerMaxPity, gems) {
        let result
        if (bannerMaxPity === 600) {
            result = (gems % 600) < 30 ? 'maxPity' : 'sidePity';
        }
        else {
            result = (gems % 900) < 30 ? 'maxPity' : 'sidePity';
        }
        return result
    }

    function calcBanner(ssrRate, ssrNoRateUp, rateUp1 = {chars: [], rate: 0}, rateUp2 = {chars: [], rate: 0}) {
        let result = ''
        let dice = probability();
        if (dice < (rateUp1.chars.length * rateUp1.rate)) {
            result = rateUp1.chars[getRandomInt(rateUp1.chars.length)]
        }
        else if (dice < ((rateUp1.chars.length * rateUp1.rate) + (rateUp2.chars.length * rateUp2.rate))) {
            result = rateUp2.chars[getRandomInt(rateUp2.chars.length)]
        }
        else if (dice < (ssrRate)) {
            result = ssrNoRateUp[getRandomInt(ssrNoRateUp.length)]
        }
        else if (dice < (ssrRate + 37)) {
            result = srCharacters[getRandomInt(srCharacters.length)]
        }
        else {
            result = rCharacters[getRandomInt(rCharacters.length)]
        }
        return result
    }

    const drawOnce = () => {
        setIsMulti(false)
        if (!drawing) {
            setDrawing(prevState => !prevState)
        }
        let result = []
        let ssrCharacters = []
        let choosableCharacters
        let ssrRate
        let ssrNoRateUp
        let ssrRateUp1
        let ssrRateUp2 = []
        let rateUp1Rate
        let rateUp2Rate = 0
        if (currentBanner.banner === EliBanner) {
            ssrRate = 4
            rateUp1Rate = 0.25
            ssrCharacters = [publicFolder + '/units/DarkTraitorMeliSSR.png', publicFolder + '/units/BlueChadKingSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/BlueMargaLudoSSR.png', publicFolder + '/units/BlueTheOneSSR.png', publicFolder + '/units/RedPurgatoryBanSSR.png', publicFolder + '/units/GreenSarielSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/GreenEscanorSSR.png', publicFolder + '/units/GreenSmallDianeSSR.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenCounterMeliSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/BlueDemonMeliSSR.png', publicFolder + '/units/BlueTarmielSSR.png', publicFolder + '/units/BlueMerlinSSR.png', publicFolder + '/units/BlueGowtherSSR.png', publicFolder + '/units/ChandlerSSR.png', publicFolder + '/units/RedSarielSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/RedExcaliburArthur.png', publicFolder + '/units/RedMerlinSSR.png', publicFolder + '/units/RedSkinnyKingSSR.png', publicFolder + '/units/LightEliSSR.png']
            ssrNoRateUp = [publicFolder + '/units/DarkTraitorMeliSSR.png', publicFolder + '/units/BlueChadKingSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/BlueMargaLudoSSR.png', publicFolder + '/units/BlueTheOneSSR.png', publicFolder + '/units/RedPurgatoryBanSSR.png', publicFolder + '/units/GreenSarielSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/GreenEscanorSSR.png', publicFolder + '/units/GreenSmallDianeSSR.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenCounterMeliSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/BlueDemonMeliSSR.png', publicFolder + '/units/BlueTarmielSSR.png', publicFolder + '/units/BlueMerlinSSR.png', publicFolder + '/units/BlueGowtherSSR.png', publicFolder + '/units/ChandlerSSR.png', publicFolder + '/units/RedSarielSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/RedExcaliburArthur.png', publicFolder + '/units/RedMerlinSSR.png', publicFolder + '/units/RedSkinnyKingSSR.png']
            ssrRateUp1 = [publicFolder + '/units/LightEliSSR.png']
            choosableCharacters = [publicFolder + '/units/LightEliSSR.png', publicFolder + '/units/DarkTraitorMeliSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner1: prevState.banner1 + 3
            }))
        }
        if (currentBanner.banner === BrunhildBanner) {
            ssrRate = 3
            rateUp1Rate = 0.5
            ssrCharacters = [publicFolder + '/units/RedBrunhildrSSR.png', publicFolder + '/units/RedWeddingDianeSSR.png', publicFolder + '/units/BlueValentineElaineSSR.png', publicFolder + '/units/RedLizSSR.png', publicFolder + '/units/RedDebuffElaine.png', publicFolder + '/units/BlueHawkOsloSSR.png', publicFolder + '/units/BlueElatteSSR.png', publicFolder + '/units/GreenHalloweenDianeSSR.png', publicFolder + '/units/GreenHalloweenGowtherSSR.png', publicFolder + '/units/GreenValentineMelasculaSSR.png', publicFolder + '/units/BlueDerieriSSR.png']
            ssrNoRateUp = [publicFolder + '/units/RedWeddingDianeSSR.png', publicFolder + '/units/BlueValentineElaineSSR.png', publicFolder + '/units/RedLizSSR.png', publicFolder + '/units/RedDebuffElaine.png', publicFolder + '/units/BlueHawkOsloSSR.png', publicFolder + '/units/BlueElatteSSR.png', publicFolder + '/units/GreenHalloweenDianeSSR.png', publicFolder + '/units/GreenHalloweenGowtherSSR.png', publicFolder + '/units/GreenValentineMelasculaSSR.png', publicFolder + '/units/BlueDerieriSSR.png']
            ssrRateUp1 = [publicFolder + '/units/RedBrunhildrSSR.png']
            choosableCharacters = [publicFolder + '/units/RedBrunhildrSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner2: prevState.banner2 + 3
            }))
        }
        if (currentBanner.banner === FreyrBanner) {
            ssrRate = 3
            rateUp1Rate = 0.5
            ssrCharacters = [publicFolder + '/units/RedFreyrSSR.png', publicFolder + '/units/BlueLVMeliSSR.png', publicFolder + '/units/GreenRagnarokDianeSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/GreenThonarSSR.png']
            ssrNoRateUp = [publicFolder + '/units/BlueLVMeliSSR.png', publicFolder + '/units/GreenRagnarokDianeSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/GreenThonarSSR.png']
            ssrRateUp1 = [publicFolder + '/units/RedFreyrSSR.png']
            choosableCharacters = [publicFolder + '/units/RedFreyrSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner3: prevState.banner3 + 3
            }))
        }
        result.push(calcBanner(ssrRate, ssrNoRateUp, {chars: ssrRateUp1, rate: rateUp1Rate}, {chars: ssrRateUp2, rate: rateUp2Rate}))
        setCurrentBanner(prevState => ({
            ...prevState,
            gemsSpent: prevState.gemsSpent + 3
        }))
        setPityCharacter(prevState => ({
            ...prevState,
            sidePityCharacter: [ssrCharacters[getRandomInt(ssrCharacters.length)]],
            maxPityCharacters: choosableCharacters
        }))
        setResultCharacters(result)
    }
    const drawMulti = () => {
        setIsMulti(true)
        if (!drawing) {
            setDrawing(prevState => !prevState)
        }
        let result = []
        let ssrCharacters = []
        let choosableCharacters
        let ssrRate
        let ssrNoRateUp
        let ssrRateUp1
        let ssrRateUp2 = []
        let rateUp1Rate
        let rateUp2Rate = 0
        if (currentBanner.banner === EliBanner) {
            ssrRate = 4
            rateUp1Rate = 0.25
            ssrCharacters = [publicFolder + '/units/DarkTraitorMeliSSR.png', publicFolder + '/units/BlueChadKingSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/BlueMargaLudoSSR.png', publicFolder + '/units/BlueTheOneSSR.png', publicFolder + '/units/RedPurgatoryBanSSR.png', publicFolder + '/units/GreenSarielSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/GreenEscanorSSR.png', publicFolder + '/units/GreenSmallDianeSSR.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenCounterMeliSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/BlueDemonMeliSSR.png', publicFolder + '/units/BlueTarmielSSR.png', publicFolder + '/units/BlueMerlinSSR.png', publicFolder + '/units/BlueGowtherSSR.png', publicFolder + '/units/ChandlerSSR.png', publicFolder + '/units/RedSarielSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/RedExcaliburArthur.png', publicFolder + '/units/RedMerlinSSR.png', publicFolder + '/units/RedSkinnyKingSSR.png', publicFolder + '/units/LightEliSSR.png']
            ssrNoRateUp = [publicFolder + '/units/DarkTraitorMeliSSR.png', publicFolder + '/units/BlueChadKingSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/BlueMargaLudoSSR.png', publicFolder + '/units/BlueTheOneSSR.png', publicFolder + '/units/RedPurgatoryBanSSR.png', publicFolder + '/units/GreenSarielSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/GreenEscanorSSR.png', publicFolder + '/units/GreenSmallDianeSSR.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenCounterMeliSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/BlueDemonMeliSSR.png', publicFolder + '/units/BlueTarmielSSR.png', publicFolder + '/units/BlueMerlinSSR.png', publicFolder + '/units/BlueGowtherSSR.png', publicFolder + '/units/ChandlerSSR.png', publicFolder + '/units/RedSarielSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/RedExcaliburArthur.png', publicFolder + '/units/RedMerlinSSR.png', publicFolder + '/units/RedSkinnyKingSSR.png']
            ssrRateUp1 = [publicFolder + '/units/LightEliSSR.png']
            choosableCharacters = [publicFolder + '/units/LightEliSSR.png', publicFolder + '/units/DarkTraitorMeliSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner1: prevState.banner1 + 30
            }))
        }
        if (currentBanner.banner === BrunhildBanner) {
            ssrRate = 3
            rateUp1Rate = 0.5
            ssrCharacters = [publicFolder + '/units/RedBrunhildrSSR.png', publicFolder + '/units/RedWeddingDianeSSR.png', publicFolder + '/units/BlueValentineElaineSSR.png', publicFolder + '/units/RedLizSSR.png', publicFolder + '/units/RedDebuffElaine.png', publicFolder + '/units/BlueHawkOsloSSR.png', publicFolder + '/units/BlueElatteSSR.png', publicFolder + '/units/GreenHalloweenDianeSSR.png', publicFolder + '/units/GreenHalloweenGowtherSSR.png', publicFolder + '/units/GreenValentineMelasculaSSR.png', publicFolder + '/units/BlueDerieriSSR.png']
            ssrNoRateUp = [publicFolder + '/units/RedWeddingDianeSSR.png', publicFolder + '/units/BlueValentineElaineSSR.png', publicFolder + '/units/RedLizSSR.png', publicFolder + '/units/RedDebuffElaine.png', publicFolder + '/units/BlueHawkOsloSSR.png', publicFolder + '/units/BlueElatteSSR.png', publicFolder + '/units/GreenHalloweenDianeSSR.png', publicFolder + '/units/GreenHalloweenGowtherSSR.png', publicFolder + '/units/GreenValentineMelasculaSSR.png', publicFolder + '/units/BlueDerieriSSR.png']
            ssrRateUp1 = [publicFolder + '/units/RedBrunhildrSSR.png']
            choosableCharacters = [publicFolder + '/units/RedBrunhildrSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner2: prevState.banner2 + 30
            }))
        }
        if (currentBanner.banner === FreyrBanner) {
            ssrRate = 3
            rateUp1Rate = 0.5
            ssrCharacters = [publicFolder + '/units/RedFreyrSSR.png', publicFolder + '/units/BlueLVMeliSSR.png', publicFolder + '/units/GreenRagnarokDianeSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/GreenThonarSSR.png']
            ssrNoRateUp = [publicFolder + '/units/BlueLVMeliSSR.png', publicFolder + '/units/GreenRagnarokDianeSSR.png', publicFolder + '/units/RedRagnarokBan.png', publicFolder + '/units/GreenRagnarokMerlinSSR.png', publicFolder + '/units/GreenJormungandrSSR.png', publicFolder + '/units/RedSkadiSSR.png', publicFolder + '/units/GreenBrunhildrSSR.png', publicFolder + '/units/BlueMegelldaSSR.png', publicFolder + '/units/SigurdSSR.png', publicFolder + '/units/GreenThonarSSR.png']
            ssrRateUp1 = [publicFolder + '/units/RedFreyrSSR.png']
            choosableCharacters = [publicFolder + '/units/RedFreyrSSR.png']
            setUsedDiamonds(prevState => ({
                ...prevState,
                banner3: prevState.banner3 + 30
            }))
        }
        for (let i = 0; i < 11; i++) {
            let choosenCharacter = calcBanner(ssrRate, ssrNoRateUp, {chars: ssrRateUp1, rate: rateUp1Rate}, {chars: ssrRateUp2, rate: rateUp2Rate})
            result.push(choosenCharacter)
        }
        setCurrentBanner(prevState => ({
            ...prevState,
            gemsSpent: prevState.gemsSpent + 30
        }))
        setPityCharacter(prevState => ({
            ...prevState,
            sidePityCharacter: [ssrCharacters[getRandomInt(ssrCharacters.length)]],
            maxPityCharacters: choosableCharacters
        }))
        setResultCharacters(result)
    }
    const bannerReturn = () => {
        setDrawing(prevState => !prevState)
    }
    const continueDraw = () => {
        if (isMulti) {
            drawMulti();
        }
        else {
            drawOnce();
        }
    }
    const bannerChange = (id, maxPity, gemsSpent, selectable) => {
        setCurrentBanner(prevState => ({
            ...prevState,
            banner: id,
            maxPity: maxPity,
            gemsSpent: gemsSpent,
            selectablePity: selectable
        }))
        let pityCheck = gemsSpent % maxPity
        if (pityCheck < 300 && pityCheck > 0) {
            setPityClaimed({pity1: false, pity2: false})
        }
        else if (pityCheck >= 300 && pityCheck < 600) {
            setPityClaimed({pity1: true, pity2: false})
        }
        else if (pityCheck >= 600 || (pityCheck === 0 && gemsSpent !== 0)) {
            setPityClaimed({pity1: true, pity2: true})
        }
        else {
            setPityClaimed({pity1: false, pity2: false})
        }
    }

    const charClick = (event) => {
        var node = document.getElementById('main--component')
        var selectedClasses = ReactDOM.findDOMNode(node).getElementsByClassName('character--selected')
        for (let i = 0; i < selectedClasses.length; i++) {
            selectedClasses[i].setAttribute('class', 'character--hover')
        }
        setPitySelected(true)
        event.currentTarget.classList.remove('character--hover');
        event.currentTarget.classList.add('character--selected');
        let pityCharacter = []
        pityCharacter.push(event.currentTarget.getAttribute('src'))
        setSelectedPity(prevState => ({
            ...prevState,
            character: pityCharacter
        }))
    }

    const selectionDone = () => {
        setOpenPityModal(false)
        setPitySelected(false)
        setSelectedPity(prevState => ({
            ...prevState,
            isSelected: true
        }))
    }

    const pityConfirmed = () => {
        setOpenPityModal(false)
        let pityCheck = currentBanner.gemsSpent % currentBanner.maxPity
        if (pityCheck >= 300 && !pityClaimed.pity1) {
            setPityClaimed(prevState => ({
                ...prevState,
                pity1: true
            }))
        }
        if (pityCheck >= 600 && !pityClaimed.pity2) {
            setPityClaimed(prevState => ({
                ...prevState,
                pity2: true
            }))
        }
    }

    const handlePityDraw = () => {
        setPityReached(prevState => ({
            ...prevState,
            isPity: false
        }))
        setOpenPityModal(true)
    }

    const closeSelectionModal = () => {
        setSelectedPity(prevState => ({
            ...prevState,
            isSelected: false
        }))
    }

    const pityBarBorderStyle = {
        height: '1.2em',
    }

    const textRotate = {
        transform: 'rotate(30deg)'
    }

    const pityClaimedStyle = {
        color: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(30, 45, 30, 0.2)'
    }

    const checkMarkStyle = {
        position: 'absolute',
        color: 'rgba(37, 240, 37, 1.0)'
    }

    const barCheck = Math.ceil(currentBanner.gemsSpent / currentBanner.maxPity) - 1

    const pityBarStyle = {
        width: `${((currentBanner.gemsSpent - currentBanner.maxPity * (barCheck === -1 ? 0 : barCheck)) / currentBanner.maxPity) * 100}%`,
        height: '100%',
        background: pityReached.isPity ? 'linear-gradient(0deg, rgba(255,255,255,1) 8%, rgba(233,254,255,1) 33%, rgba(188,251,255,1) 66%, rgba(155,251,255,1) 92%)' : 'linear-gradient(0deg, rgba(218,252,255,1) 8%, rgba(167,251,255,1) 33%, rgba(115,247,255,1) 66%, rgba(24,246,255,1) 92%)',
        transition: 'width 1s'
    }

    const downloadDraw = async () => {
        const dataUrl = await htmlToImage.toPng(ref.current)
        const link = document.createElement('a');
        link.download = `${isMulti ? 'Multi.png' : 'Single.png'}`;
        link.href = dataUrl;
        link.click();
    }

    let characters = resultCharacters.map((chars, index) => {
        return <Character character={chars} alt='Result Character' className={drawing ? isMulti ? 'character--multi' : 'character--single' : 'inactive'} key={index}/>
    })
    let randomPityRewards = pityCharacters.sidePityCharacter.map((chars, index) => {
        return <Character character={chars} alt='Random Pity Character' className='pity--character' key={index}/>
    })
    let maxPityRewards = pityCharacters.maxPityCharacters.map((chars, index) => {
        return <Character character={chars} alt='Max Pity Character' className='pity--character' key={index}/>
    })
    let maxPitySelector = pityCharacters.maxPityCharacters.map((chars, index) => {
        return <Character character={chars} alt='Max Pity Selector' className={'character--hover'} pitySelector={charClick} key={index}/>
    })
    return (
        <main className='home--container' id='main--component'>
            <h1 className='home--title'>Grand Cross Summon Simulator</h1>
            <div className='banners--container'>
                <p className={drawing ? 'inactive' : 'banners--title'}>Banners:</p>
                <h1 className={drawing ? 'draw--title' : 'inactive'}>Results</h1>
                <SmallBanner smallBanner={EliBannerSmall} alt='Eli Banner' className={!drawing ? currentBanner.banner === EliBanner ? 'banners--scaled' : 'banners--small' : 'inactive'} onClick={() => bannerChange(EliBanner, 900, usedDiamonds.banner1, true)}/>
                <SmallBanner smallBanner={BrunhildBannerSmall} alt='Brunhild Banner' className={!drawing ? currentBanner.banner === BrunhildBanner ? 'banners--scaled' : 'banners--small' : 'inactive'} onClick={() => bannerChange(BrunhildBanner, 600, usedDiamonds.banner2, false)}/>
                <SmallBanner smallBanner={FreyrBannerSmall} alt='Freyr Banner' className={!drawing ? currentBanner.banner === FreyrBanner ? 'banners--scaled' : 'banners--small' : 'inactive'} onClick={() => bannerChange(FreyrBanner, 600, usedDiamonds.banner3, false)}/>
            </div>
            <div className='bigBanner--container'>
                <Banner banner={currentBanner.banner} className={drawing ? 'inactive' : 'banner--big'}/>
                {!drawing && 
                <div className='pityBar--banner'>
                    <div className={currentBanner.maxPity === 900 ? 'ssr--sidePity1--900' : 'ssr--sidePity1--600'} style={pityClaimed.pity1 ? pityClaimedStyle : null}><p style={textRotate}>SSR</p>
                        {pityClaimed.pity1 && <p style={checkMarkStyle} className='arrow--pityBar'>&#10003;</p>}
                    </div>
                    <div className={currentBanner.maxPity === 900 ? 'ssr--sidePity2' : 'inactive'} style={pityClaimed.pity2 ? pityClaimedStyle : null}><p style={textRotate}>SSR</p>
                        {pityClaimed.pity2 && <p style={checkMarkStyle} className='arrow--pityBar'>&#10003;</p>}
                    </div>
                    <div className='pity--barBanner' style={pityBarBorderStyle}>
                        <div style={pityBarStyle}>
                            <div className={currentBanner.maxPity === 900 ? 'first--pity900' : 'first--pity600'}></div>
                            <div className={currentBanner.maxPity === 900 ? 'second--pity' : 'inactive'}></div>
                        </div>
                    {/*<span className='first--pityLabel'>300</span>
                    <span className='second--pityLabel'>600</span>
                    <span className='third--pityLabel'>900</span>*/}
                    </div>
                </div>
                }
            </div>
            <div className='download--container'>
                {drawing && <button onClick={downloadDraw} className={isMulti ? 'download--button--multi' : 'download--button--single'}>Download As Image</button>}
            </div>
            <div className={drawing ? isMulti ? 'multi--container' : 'single--container' : 'inactive'} ref={ref}>
                {characters}
            </div>
            <div className='draw--container'>
                <button className={drawing ? pityReached.isPity ? 'inactive' : 'inactive' : 'draw--button'} onClick={drawOnce}>Draw 1 Time(s)</button>
                <button className={drawing ? pityReached.isPity ? 'inactive' : 'draw--button' : 'inactive'} onClick={bannerReturn}>Return to Banners</button>
                <button className={drawing ? pityReached.isPity ? 'inactive' : 'inactive' : 'draw--button'} onClick={drawMulti}>Draw 11 Times(s)</button>
                <button className={drawing ? pityReached.isPity ? 'inactive' : 'draw--button' : 'inactive'} onClick={continueDraw}>Draw Again</button>
                <button className={pityReached.isPity ? 'draw--button' : 'inactive'} onClick={handlePityDraw}>Check Results</button>
                {drawing &&
                <div className='pityBar--drawing'>
                    <div className={currentBanner.maxPity === 900 ? 'ssr--sidePity3--900' : 'ssr--sidePity3--600'} style={pityClaimed.pity1 ? pityClaimedStyle : null}><p style={textRotate}>SSR</p>
                        {pityClaimed.pity1 && <p style={checkMarkStyle} className='arrow--pityBar'>&#10003;</p>}
                    </div>
                    <div className={currentBanner.maxPity === 900 ? 'ssr--sidePity4' : 'inactive'} style={pityClaimed.pity2 ? pityClaimedStyle : null}><p style={textRotate}>SSR</p>
                        {pityClaimed.pity2 && <p style={checkMarkStyle} className='arrow--pityBar'>&#10003;</p>}
                    </div>
                    <div className='pity--bar'>
                        <div style={pityBarStyle}>
                            <div className={currentBanner.maxPity === 900 ? 'first--pity900' : 'first--pity600'}></div>
                            <div className={currentBanner.maxPity === 900 ? 'second--pity' : 'inactive'}></div>
                        </div>
                    {/*<span className='first--pityLabel'>300</span>
                    <span className='second--pityLabel'>600</span>
                    <span className='third--pityLabel'>900</span>*/}
                    </div>
                </div>}
            </div>
            {openPityModal && ( pityReached.pityType === 'maxPity' ? currentBanner.selectablePity ? <Pitymodal reward={maxPitySelector} buttonClick={selectionDone} buttonDisabled={!pitySelected} title='Choose One' /> : <Pitymodal reward={maxPityRewards} buttonClick={pityConfirmed} buttonDisabled={false} title='Reward' /> : <Pitymodal reward={randomPityRewards} buttonClick={pityConfirmed} buttonDisabled={false} title='Reward' /> )}
            {selectedPity.isSelected && <Pitymodal reward={<Character character={selectedPity.character[0]} alt='Max Pity Character' className='pity--character' key='Selected Character'/>} buttonClick={closeSelectionModal} buttonDisabled={false} title='Reward' />}
        </main>
    )
}


