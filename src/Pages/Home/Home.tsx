import { useNavigate } from "react-router-dom";
import LiComponent from "../../Components/LiComponent";
import { useGetPostsQuery } from "../../Services/FetchData";
import "./Home.css";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading, error } = useGetPostsQuery(undefined);
  const navigate = useNavigate();
  return (
    <section>
      <ul className="Posts">
        <section onClick={() => navigate("add")} className="AddPost">
          Add post +
        </section>
        <li className="title row">
          <div className="nameCell cell">
            <span>Name</span>
          </div>
          <div className="IDCell cell">
            <span>ID</span>
          </div>
        </li>
        {data && data.map((post) => <LiComponent data={post} />)}
      </ul>
    </section>
  );
};

export default Home;
