import { useNavigate } from 'react-router-dom';

import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
  } from './category-item.styles.jsx';

const CategoryItem = ({category}) => {
    const {title, imageUrl, route} = category;
    const nav = useNavigate();

    const onNavHandler = () => nav(route);

    return (
        <DirectoryItemContainer onClick={onNavHandler}>
          <BackgroundImage imageUrl={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    );
}

export default CategoryItem;