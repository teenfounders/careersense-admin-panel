//  import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';

// const ExperienceTracker = () => {
//   const queryClient = useQueryClient();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const { data: experienceData, isLoading, isError } = useQuery('experienceData', fetchExperienceData);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const createExperience = useMutation(
//     (formData) => axios.post(`/api/experience`, formData),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('experienceData');
//         onClose();
//       },
//     }
//   );

//   const updateExperience = useMutation(
//     (formData) => axios.put(`/api/experience/${editId}`, formData),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries('experienceData');
//         onClose();
//         reset();
//         setEditId(null);
//         setIsEditing(false);
//       },
//     }
//   );

//   const onSubmit = (formData) => {
//     if (isEditing) {
//       updateExperience.mutate(formData);
//     } else {
//       createExperience.mutate(formData);
//     }
//   };

//   const handleEdit = (experienceId) => {
//     // Fetch the experience details based on experienceId and populate the form
//     // This is just a placeholder function, replace it with your actual implementation
//     const experienceDetails = fetchExperienceDetails(experienceId);
//     if (experienceDetails) {
//       reset(experienceDetails);
//       setEditId(experienceId);
//       setIsEditing(true);
//       onOpen();
//     }
//   };

//   const renderExperienceCards = () => {
//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error fetching data</div>;

//     return (
//       <div>
//         {experienceData.map((experience) => (
//           <div key={experience.id}>
//             <p>{experience.role}</p>
//             <p>{experience.experience}</p>
//             <button onClick={() => handleEdit(experience.id)}>Edit</button>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Your UI components go here */}
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="text" {...register('role')} placeholder="Role" />
//         <input type="text" {...register('experience')} placeholder="Experience" />
//         <button type="submit">{isEditing ? 'Update Experience' : 'Add Experience'}</button>
//       </form>

//       {renderExperienceCards()}
//     </div>
//   );
// };

// export default ExperienceTracker;

// // Helper functions for fetching data
// const fetchExperienceData = async () => {
//   const response = await axios.get('/api/experience');
//   return response.data;
// };

// const fetchExperienceDetails = async (experienceId) => {
//   const response = await axios.get(`/api/experience/${experienceId}`);
//   return response.data;
// };
