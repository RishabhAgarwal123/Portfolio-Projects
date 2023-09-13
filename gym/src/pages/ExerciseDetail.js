import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

import { fetchData, exerciseOptions, youtubeOptions } from '../utils/fetchData';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [videos, setVideos] = useState([]);
  const [target, setTarget] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = `https://exercisedb.p.rapidapi.com`;
      const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;

      const exerciseDetailData = await fetchData(`${exerciseDBUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const videosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name}`, youtubeOptions);
      setVideos(videosData.contents);

      const targetMuscleExercisesData = await fetchData(`${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}`, 
      exerciseOptions);
      setTarget(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(`${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}`, 
      exerciseOptions);
      setEquipment(equipmentExercisesData);
      
    }
    fetchExercisesData();
  }, [id, exerciseDetail.name]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos videos={videos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscles={target} equipments={equipment} />
    </Box>
  )
}

export default ExerciseDetail