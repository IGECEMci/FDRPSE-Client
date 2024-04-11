import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Input, Spinner, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react';

import { EyeIcon, FilterIcon, PlusIcon, QuestionIcon, SearchIcon, StarsIcon, StarsOff } from '../../../infraestructure/components/icons';
import { PageLayout } from '../../../infraestructure/components/ui';
import { questionService } from '../../../domain/services/question.service';
import { useNavigation } from '../../hooks/useNavigation';
import { useDebounce } from '../../hooks/useDebounce';

import { useParams } from '../../hooks/useParams';

export const QuestionsPage = () => {

    const { navigate } = useNavigation();

    const firstRender = useRef<boolean>(true);
    const { loading, questions, startGetQuestions } = questionService();
    const { setQueryParams, parseToString, getValueOfQueryParams } = useParams();

    const [query, setQuery] = useState<string>(getValueOfQueryParams('name') ?? '');

    const debounce = useDebounce(query, 500);

    const handleSearch = useCallback((value: string) => {
        setQuery(value)
    }, []);


    useEffect(() => {
        startGetQuestions(parseToString());
    }, [parseToString()]);

    useEffect(() => {
        !firstRender.current && setQueryParams({ name: debounce });
        firstRender.current = false;
    }, [debounce])


    return (
        <PageLayout title="Preguntas">
            <Button className="bg-slate-800 text-white py-[23px] px-8 font-bold float-right mb-10"
                onClick={() => navigate('create')}
                startContent={
                    <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                        <PlusIcon width={18} height={18} strokeWidth={1.5} />
                    </span>
                }>
                Crear Pregunta
            </Button>
            <div className="w-full pb-10 mb-5 mt-2 grid grid-cols-1 lg:grid-cols-2 items-center border-b-2">
                <Input
                    className="w-full [&>div>div>div>svg]:text-emerald-600"
                    placeholder="Buscar por nombre..."
                    value={query}
                    onValueChange={handleSearch}
                    startContent={
                        <SearchIcon strokeWidth={2.5} />
                    }
                />
                <div className="flex items-center lg:justify-end w-full mt-4 lg:mt-0 overflow-x-auto">
                    <Tabs
                        aria-label="Options filter"
                        className="my-4"
                        selectedKey={getValueOfQueryParams('type') || 'gradable'}
                        color="primary"
                        variant="bordered"
                        onSelectionChange={(key) => { !firstRender.current && setQueryParams({ type: `${key}` }) }}
                        classNames={{
                            cursor: "w-full bg-emerald-500",
                        }}
                    >
                        <Tab key="gradable" title={
                            <div className="flex items-center space-x-2 font-bold">
                                <StarsIcon strokeWidth={2} />
                                <span>Preguntas con calificación</span>
                            </div>
                        } />
                        <Tab key="nongradable" title={
                            <div className="flex items-center space-x-2 font-bold">
                                <StarsOff strokeWidth={2} />
                                <span>Preguntas sin calificación</span>
                            </div>
                        } />
                    </Tabs>
                    <span className="ml-auto md:ml-4 font-bold text-sm flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                        <FilterIcon width={35} height={35} strokeWidth={1.5} />
                        Filtros
                    </span>
                </div>
            </div>
            <Table aria-label="Table for users">
                <TableHeader>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base"> # </TableColumn>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base"> Pregunta </TableColumn>
                    <TableColumn className="py-5 text-emerald-700 font-extrabold text-base">  </TableColumn>
                </TableHeader>
                <TableBody items={questions} loadingContent={<Spinner color="success" />} isLoading={loading}>
                    {
                        questions.map(({ id, name }, index) => (
                            <TableRow key={id} className="[&>td]:py-4 hover:bg-gray-100 hover:cursor-pointer transition-all duration-400 ease-in [&>*:first-child]:rounded-s-large [&>*:last-child]:rounded-e-large">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <span className="flex items-center gap-x-3">
                                        <span className="bg-emerald-600 min-h-[2.5rem] min-w-[2.5rem] flex items-center justify-center text-white rounded-xl">
                                            <QuestionIcon />
                                        </span>
                                        {name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`show/${id}`)}
                                        className="bg-slate-800 text-white text-xs h-9 font-bold"
                                        endContent={
                                            <span className="bg-white text-slate-800 rounded-full p-[1.2px]">
                                                <EyeIcon width={15} height={15} />
                                            </span>}>
                                        Ver
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </PageLayout>
    )
}

// <QuestionControls>
//     <div className="flex flex-col items-center justify-center">
//         <h1 className="font-semibold text-emerald-600">Para responder las preguntas siguientes considere las condiciones ambientales de sus centro de trabajo</h1>
//         <div className="text-left">
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="0">Siempre</Checkbox>
//                         <Checkbox value="1">Casi Siempre</Checkbox>
//                         <Checkbox value="2">Algunas veces</Checkbox>
//                         <Checkbox value="3">Casi nunca</Checkbox>
//                         <Checkbox value="4">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         // color="primary"
//                         orientation="horizontal"
//                         isRequired
//                         className="text-[#01454F]"
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//             <div className="my-14">
//                 <p className="font-bold">El espacio donde trabajo me permite realizar mis actividades de manera segura e higienica</p>
//                 <span>
//                     <CheckboxGroup
//                         color="primary"
//                         orientation="horizontal"
//                         isRequired
//                     >
//                         <Checkbox value="buenos-aires">Siempre</Checkbox>
//                         <Checkbox value="sydney">Casi Siempre</Checkbox>
//                         <Checkbox value="san-francisco">Algunas veces</Checkbox>
//                         <Checkbox value="london">Casi nunca</Checkbox>
//                         <Checkbox value="tokyo">Nunca</Checkbox>
//                     </CheckboxGroup>
//                 </span>
//             </div>
//         </div>
//     </div>
// </QuestionControls>