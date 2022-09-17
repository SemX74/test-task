import { useNavigate } from "react-router-dom";
import { Post } from "../Services/Interfaces";

interface LiComponentProps {
  data: Post;
}

const LiComponent: React.FC<LiComponentProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <section onClick={() => navigate(`post/${data.id}`)} className="row">
      <div className="nameTableCell nameCell cell ">
        <span>{data.title}</span>
      </div>
      <div className="dateTableCell dateCell cell ">
        <span>{data.id}</span>
      </div>
    </section>
  );
};

export default LiComponent;
