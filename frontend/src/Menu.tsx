import { useState } from 'react'
import './index.css'
import EditableTextItem from "./EditableText";

type item = { iname: string, to: boolean, from: boolean }
type category = { cname: string, color: string, items: item[]}
type setCategoriesFn = (categories: category[] | null) => void;
type MenuProps = { categories: category[] | null, setCategories: setCategoriesFn }

function Menu({ categories, setCategories } : MenuProps) {
  const [colorIndex, setColorIndex] = useState<number>(0); 
  const [cname, setCname] = useState<string>("");
  const colors = ["#FF4C4C", "#4EBCA8", "#5685FC", "#D6BC34", "#FF4CC2", "#52D647"];
  const numCat = categories ? categories.length : 0;
  const backgroundHeight = ((numCat/2)<3) ? 800 : 800+176*(Math.ceil(numCat/2)-3);
  const mainHeight = ((numCat/2)<3) ? 714 : 714+176*(Math.ceil(numCat/2)-3);

  const addCategory = () => {
    const newCat = { cname: cname, color: colors[colorIndex], items: [] }
    setColorIndex((colorIndex + 1) % 6);
    setCategories(categories ? [...categories, newCat] : [newCat]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCategory = (id: any, text: string) => {
    setCname(text);
  }

  const deleteCategory = (cname: string) => {
    const new_categories = categories ? categories.filter(cat => cat.cname !== cname) : null;
    setCategories(new_categories);
  }

  return (
    <div className='frame'>
      <div style={{width: 360, height: backgroundHeight}} className='mobileBackground'>
        <div style={{height: 60, width: 360}}className='header'>
          <img src="./assets/add_icon.png" style={{width: 40, height: 40}} className='addButton' onClick={addCategory}/>
          <div style={{width: 256, height: 40}} className="categoryBox">
            <EditableTextItem id="category" initialText='New Category Name' onStateChange={updateCategory}/>
          </div>
        </div>
          <div style={{width: 314, height: mainHeight}} className="main"></div>
          {categories ? 
            categories.map((cat, index) => {
              const row = Math.floor(index/2);
              const left = (index%2) ? 186 : 36; 
              const topBorder = 85;
              const betweenCat = 10;
              return <div key={cat.cname}
                          style={{ width: 138, height: 176, 
                                   top: topBorder+(176+betweenCat)*row, left: left, 
                                   background: cat.color }} 
                          className='category'>
                      <div className='categoryHeader'>
                        <div className='categoryTitle'>{cat.cname}</div> 
                        <img src="./assets/delete_icon.png" style={{width: 30, height: 30}} 
                             className='deleteButton' onClick={() => deleteCategory(cat.cname)}/>
                      </div>
                      <ul>
                        {cat.items.map(item => {
                          let color = "#000000";
                          if (item.from) {
                            color = "#FFFFFF";
                          } else if (item.to) {
                            color = "#15EF5F";
                          }
                          return <li key={item.iname} style={{color: color}}>{item.iname}</li>
                        })}
                      </ul>
                    </div>
          }) : null}
        <div>
        </div>
      </div>
    </div>
  )
}

export default Menu
