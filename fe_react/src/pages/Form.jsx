import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Text, Image } from 'grommet'
import { observer } from 'mobx-react'

// Store
import { ApplicationStoreContext } from '../stores/applicationStore'

// Components
import SingleStepForm from '../components/SingleStepForm'
import SidebarNav from '../components/Sidebar'
import Wizard from '../components/Wizard'

// Assets
import logo from '../assets/logo.jpg'
import { StyledSidebar, StyledHeader, MainComponent } from './Form.styled'

const Form = observer(() => {
  const {
    disableNext,
    setDisableNext,
    getQuestions,
    sortedSectionList,
    personalInfo,
    setPersonalInfo,
  } = useContext(ApplicationStoreContext)
  const [sidebarOpen, toggleSidebar] = useState(true)
  const [currentStep, setCurrentStep] = useState(2)

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  useEffect(() => {
    !!sortedSectionList.length && setCurrentStep(sortedSectionList[0].id)
  }, [sortedSectionList])

  const handleClickNext = (step) => setCurrentStep(step)

  const handleClickPrev = (step) => setCurrentStep(step)

  return (
    <Grid
      fill
      rows={['auto', 'flex']}
      columns={['auto', 'flex']}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <StyledHeader
        elevation="xlarge"
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}
      >
        <Button onClick={() => toggleSidebar(!sidebarOpen)}>
          <Image src={logo} height="40" width="200" />
        </Button>
      </StyledHeader>
      {sidebarOpen && !!sortedSectionList.length && (
        <StyledSidebar
          elevation="xlarge"
          gridArea="sidebar"
          width="250px"
          animation={[
            { type: 'fadeIn', duration: 300 },
            { type: 'slideRight', size: 'xlarge', duration: 150 },
          ]}
        >
          <SidebarNav
            currentStep={currentStep}
            steps={sortedSectionList}
            handleClickPrev={handleClickPrev}
          />
        </StyledSidebar>
      )}
      <MainComponent gridArea="main" justify="center" align="center">
        {!!sortedSectionList.length && (
          <Wizard
            currentStep={currentStep}
            disableNext={disableNext}
            steps={sortedSectionList}
            setDisableNext={setDisableNext}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            component={(props) => (
              <SingleStepForm
                sortedSectionList={sortedSectionList}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                setDisableNext={setDisableNext}
                {...props}
              />
            )}
          />
        )}
      </MainComponent>
    </Grid>
  )
})

export default Form
