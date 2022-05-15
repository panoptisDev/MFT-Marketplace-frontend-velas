import Card4 from 'components/cards/Card4';
import './collectionList.scss'
type CollectionType = {
    handleCommand ? :(type : string, token : string)=>void
}
export default function VelasCollectionList({handleCommand}:CollectionType) {
 
    const doCommand = (type : string, token : string) => {
		handleCommand(type, token);
	}

    return (
        <div className="collectionList" id = "sneak">
            <Card4 handleClickCommand = {doCommand} tokenID = {"1"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"2"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"3"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"4"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"5"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"6"}/>
            <Card4 handleClickCommand = {doCommand} tokenID = {"7"}/>
        </div>
    )
}

