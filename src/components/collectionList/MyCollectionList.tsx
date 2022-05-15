import Card3 from 'components/cards/Card3';
import './collectionList.scss'
type CollectionType = {
    handleCommand ? :(type : string, token : string)=>void
}
export default function MyCollectionList({handleCommand}:CollectionType) {
 
    const doCommand = (type : string, token : string) => {
		handleCommand(type, token);
	}

    return (
        <div className="collectionList" id = "sneak">
            <Card3 handleClickCommand = {doCommand} tokenID = {"1"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"2"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"3"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"4"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"5"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"6"} link = {"/velas/velas-apes-club/"}/>
            <Card3 handleClickCommand = {doCommand} tokenID = {"7"} link = {"/velas/velas-apes-club/"}/>
        </div>
    )
}

