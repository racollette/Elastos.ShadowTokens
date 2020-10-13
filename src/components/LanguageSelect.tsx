import React from 'react';
import styled from 'styled-components';
import { withStyles } from "@material-ui/styles";
import theme from "../theme/theme";
import OutsideClickHandler from 'react-outside-click-handler';
// import { PLarge } from '../Typography';
import PublicIcon from '@material-ui/icons/Public';
import Button from "@material-ui/core/Button";
import i18n from 'i18next';

const SUPPORTED_LANGUAGES = ['en', 'zh'];

const codeToLang = (code: any) => {
	switch (code) {
		case 'en':
			return 'English';
		case 'zh':
			return 'Chinese (Simplified)';
		default:
			return 'English';
	}
};

const LanguageSelect = ({ isVisible, position, store }: any) => {
	const open = store.get("localesOpen")
	if (!isVisible) return null;
	return (
		<div>
			<RoundButton onClick={() => store.set("localesOpen", true) }>
				<PublicIcon color="action"/>
			</RoundButton>
		<OutsideClickHandler onOutsideClick={() => store.set("localesOpen", false) }>
			{open && (<Wrapper>
				<Languages>
					{SUPPORTED_LANGUAGES.map(language => {
						return (
							<LanguageElement key={language} onClick={
								() => {
									i18n.changeLanguage(language)
									store.set("localesOpen", false)
								}}>
								<LanguageImage src={`/images/languages/${language}.svg`}></LanguageImage>
								<LanguageText>{codeToLang(language)}</LanguageText>
							</LanguageElement>
						);
					})}
				</Languages>
			</Wrapper>)}
			
		</OutsideClickHandler>
		</div>
	);
};

const Wrapper = styled.div`
	margin-top: 4px;
	margin-left: 8px;
	margin-right: 8px;
	padding: 8px;
	background-color: rgb(32,32,32);
	border: 1px solid ${theme.palette.info.contrastText};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	z-index: 1;
`;

const Languages = styled.ul`
	padding: 0;
	margin: 0;
`;

const LanguageElement = styled.li`
	padding: 5px 10px;
	display: flex;
	align-items: center;
	border-radius: 2px;
	cursor: pointer;
	&:hover {
		background-color: rgb(48,48,48);
		color: #fff;
	}
`;

const LanguageImage = styled.img`
	height: 18px;
	margin-right: 16px;
`;

const LanguageText = styled.p`
	color: #fff;
	font-size: 12px;
`;

const RoundButton = withStyles({
    root: {
		position: "relative",
		marginLeft: 8,
		marginRight: 8,
		height: 32,
		minWidth: 48,
        textTransform: "none",
        border: "1px solid " + theme.palette.info.contrastText,
        borderRadius: 8,
        backgroundColor: "rgb(32,32,32)",
        paddingTop: 5,
        paddingBottom: 5,
        "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: "rgb(32,32,32)",
        },
    },
})(Button);

export default LanguageSelect;
