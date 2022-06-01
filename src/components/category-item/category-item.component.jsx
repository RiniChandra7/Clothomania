import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
  } from './category-item.styles.jsx';

const CategoryItem = ({category}) => {
    const {id, title, imageUrl} = category;

    return (
        <DirectoryItemContainer>
          <BackgroundImage imageUrl={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    );
}

export default CategoryItem;