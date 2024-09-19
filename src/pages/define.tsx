import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePageState } from "../redux/slicePage";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import * as icons from "@mui/icons-material";
import { DefinitionItem, Exercise, removeItem, updateItem } from "../redux/sliceDefinition";
import { useNavigate, useParams } from "react-router-dom";
import { addItem } from "../redux/sliceDefinition";
import { RootState } from "../redux/store";

export default function Define() {
    const [definitionName, setDefinitionName] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const definitions = useSelector((state: RootState) => state.definition.items);
    const [deleteButtonText, setDeleteButtonText] = useState("Delete Definition");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(updatePageState({
            navItems: [
            ],
            title: "define"
        }));
    }, [dispatch]);

    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        if (id) {
            const definitionItem = definitions.find(item => item.id === parseInt(id));
            if (definitionItem) {
                setDefinitionName(definitionItem.name);
                setExercises(definitionItem.exercises);
            }
        }
    }, [id]);

    const handleAddExercise = () => {
        setExercises((prevExercises) => [...prevExercises, { name: "", reps: 0, setCount: 0 }]);
    };

    const handleDeleteExercise = (index: number) => {
        setExercises((prevExercises) => {
            const updatedExercises = [...prevExercises];
            updatedExercises.splice(index, 1);
            return updatedExercises;
        });
    };

    const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
        setExercises((prevExercises) => {
            const updatedExercises = [...prevExercises];
            if (field === 'name') {
                updatedExercises[index][field] = value as string;
            } else if (field === 'reps' || field === 'setCount') {
                updatedExercises[index][field] = value as number;
            }
            return updatedExercises;
        });
    };

    const handleSaveDefinition = () => {
        if (id) {
            dispatch(updateItem({
                id: parseInt(id),
                name: definitionName,
                exercises: exercises
            }));
        } else {
            dispatch(addItem({
                id: 0, // This will be set by the reducer
                name: definitionName,
                exercises: exercises
            }));
        }
        navigate(-1);
    };

    const handleDeleteDefinition = () => {
        if (deleteButtonText === "Delete Definition") {
            setDeleteButtonText("Confirm Delete");
        } else {
            if (id) {
                dispatch(removeItem(parseInt(id)));
            }
            navigate(-1);
        }
    };

    return (
        <div>
            <Box component="form" sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Definition Name"
                    variant="outlined"
                    margin="normal"
                    value={definitionName}
                    onChange={(e) => setDefinitionName(e.target.value)}
                />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Exercises
                </Typography>

                {exercises.map((exercise, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                label="Exercise Name"
                                variant="outlined"
                                margin="normal"
                                value={exercise.name}
                                onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                            />
                            <IconButton
                                onClick={() => handleDeleteExercise(index)}
                                color="error"
                            >
                                <icons.Delete />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Reps"
                                variant="outlined"
                                margin="normal"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange(index, "reps", parseInt(e.target.value))}
                            />
                            <TextField
                                fullWidth
                                label="Sets"
                                variant="outlined"
                                margin="normal"
                                value={exercise.setCount}
                                onChange={(e) => handleExerciseChange(index, "setCount", parseInt(e.target.value))}
                            />
                        </Box>

                        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
                    </Box>
                ))}


                <Button
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={handleAddExercise}
                >
                    Add Exercise
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSaveDefinition}
                >
                    Save Definition
                </Button>

                {id && (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={handleDeleteDefinition}
                    >
                        {deleteButtonText}
                    </Button>
                )}
            </Box>
        </div>
    );
}

