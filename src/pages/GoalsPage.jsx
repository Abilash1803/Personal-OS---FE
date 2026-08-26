import { useState, useMemo } from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLifeAreas } from '../hooks/useLifeAreas';
import { useGoals } from '../hooks/useGoals';
import { useTemplates } from '../hooks/useTemplates';
import { LifeAreaCard } from '../features/goals/components/LifeAreaCard';
import { GoalCard } from '../features/goals/components/GoalCard';
import { TemplateRow } from '../features/goals/components/TemplateRow';
import { CreateLifeAreaModal } from '../features/goals/components/CreateLifeAreaModal';
import { CreateGoalModal } from '../features/goals/components/CreateGoalModal';
import { CreateTemplateModal } from '../features/goals/components/CreateTemplateModal';
import { Target, Layers, Plus, ChevronLeft, Calendar } from 'lucide-react';

export const GoalsPage = () => {
  const { lifeAreas, createLifeArea, updateLifeArea, deleteLifeArea } = useLifeAreas();
  const { goals, createGoal, updateGoal, toggleArchiveGoal, deleteGoal } = useGoals();
  const { templates, createTemplate, updateTemplate, toggleActiveTemplate, deleteTemplate } = useTemplates();

  const [selectedLifeAreaId, setSelectedLifeAreaId] = useState(() => lifeAreas[0]?.id || null);
  const [selectedGoalId, setSelectedGoalId] = useState(() => goals[0]?.id || null);

  // Modal open states
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Mobile Drill-down view state: 'areas', 'goals', 'templates'
  const [mobileStep, setMobileStep] = useState('areas');

  const selectedLifeArea = useMemo(
    () => lifeAreas.find((la) => la.id === selectedLifeAreaId) || lifeAreas[0] || null,
    [lifeAreas, selectedLifeAreaId]
  );

  const filteredGoals = useMemo(
    () => goals.filter((g) => g.lifeAreaId === selectedLifeAreaId),
    [goals, selectedLifeAreaId]
  );

  const selectedGoal = useMemo(
    () => goals.find((g) => g.id === selectedGoalId) || filteredGoals[0] || null,
    [goals, selectedGoalId, filteredGoals]
  );

  const filteredTemplates = useMemo(
    () => templates.filter((t) => t.goalId === selectedGoalId),
    [templates, selectedGoalId]
  );

  const handleSelectAreaMobile = (areaId) => {
    setSelectedLifeAreaId(areaId);
    setMobileStep('goals');
  };

  const handleSelectGoalMobile = (goalId) => {
    setSelectedGoalId(goalId);
    setMobileStep('templates');
  };

  const handleCreateAreaSubmitted = (data) => {
    const created = createLifeArea(data);
    if (created?.id) setSelectedLifeAreaId(created.id);
  };

  const handleCreateGoalSubmitted = (data) => {
    const created = createGoal(data);
    if (created?.id) setSelectedGoalId(created.id);
  };

  const handleCreateTemplateSubmitted = (data) => {
    createTemplate(data);
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>Goal-Driven System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Goals Architecture
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5 font-normal">
            Life Areas → Strategic Goals → Task Templates → Daily Execution.
          </p>
        </div>

        {/* Mobile Back Button */}
        {mobileStep !== 'areas' && (
          <button
            type="button"
            onClick={() => setMobileStep(mobileStep === 'templates' ? 'goals' : 'areas')}
            className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl self-start transition-all min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to {mobileStep === 'templates' ? 'Goals' : 'Life Areas'}</span>
          </button>
        )}
      </div>

      {/* Desktop 3-Column Layout (≥ 1024px) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
        {/* Life Areas Column (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Layers}
              title="Life Areas"
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsAreaModalOpen(true)}>
                  Add
                </Button>
              }
            />
            <div className="space-y-2">
              {lifeAreas.length === 0 ? (
                <div className="p-4 text-center bg-slate-50/60 border border-dashed border-slate-200 rounded-xl space-y-1">
                  <p className="text-xs font-semibold text-[#0F172A]">No Life Areas yet</p>
                  <p className="text-[11px] text-[#64748B]">Click "+ Add" to create your first Life Area.</p>
                </div>
              ) : (
                lifeAreas.map((la) => (
                  <LifeAreaCard
                    key={la.id}
                    lifeArea={la}
                    isSelected={la.id === selectedLifeAreaId}
                    onSelect={setSelectedLifeAreaId}
                    onRename={(id, newName) => updateLifeArea(id, { name: newName })}
                    onDelete={deleteLifeArea}
                    goalCount={goals.filter((g) => g.lifeAreaId === la.id).length}
                  />
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Strategic Goals Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Target}
              title={selectedLifeArea ? `${selectedLifeArea.name} Goals` : 'Goals'}
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsGoalModalOpen(true)}>
                  Add Goal
                </Button>
              }
            />
            {!selectedLifeArea ? (
              <p className="text-xs text-slate-400 p-4 text-center">Create a Life Area first.</p>
            ) : filteredGoals.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 text-center">No goals in this Life Area.</p>
            ) : (
              <div className="space-y-2.5">
                {filteredGoals.map((g) => (
                  <GoalCard
                    key={g.id}
                    goal={g}
                    isSelected={g.id === selectedGoalId}
                    onSelect={setSelectedGoalId}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                    onToggleArchive={toggleArchiveGoal}
                    templateCount={templates.filter((t) => t.goalId === g.id).length}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Task Templates Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Calendar}
              title={selectedGoal ? `${selectedGoal.title} Templates` : 'Task Templates'}
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsTemplateModalOpen(true)}>
                  Add Template
                </Button>
              }
            />
            {!selectedGoal ? (
              <p className="text-xs text-slate-400 p-4 text-center">Select or create a Goal first.</p>
            ) : filteredTemplates.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 text-center">No task templates for this goal.</p>
            ) : (
              <div className="space-y-2.5">
                {filteredTemplates.map((t) => (
                  <TemplateRow
                    key={t.id}
                    template={t}
                    onUpdate={updateTemplate}
                    onToggleActive={toggleActiveTemplate}
                    onDelete={deleteTemplate}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Mobile Breadcrumb Hierarchy Navigation */}
      <div className="lg:hidden flex items-center gap-1.5 p-2 bg-slate-100/80 rounded-xl text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setMobileStep('areas')}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            mobileStep === 'areas'
              ? 'bg-white text-blue-600 shadow-2xs font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Life Areas
        </button>

        {selectedLifeArea && (
          <>
            <span className="text-slate-400">/</span>
            <button
              type="button"
              onClick={() => setMobileStep('goals')}
              className={`px-2.5 py-1 rounded-lg transition-all truncate max-w-[130px] ${
                mobileStep === 'goals'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {selectedLifeArea.icon} {selectedLifeArea.name}
            </button>
          </>
        )}

        {selectedGoal && mobileStep === 'templates' && (
          <>
            <span className="text-slate-400">/</span>
            <span className="px-2.5 py-1 rounded-lg bg-white text-blue-600 shadow-2xs font-bold truncate max-w-[130px]">
              🎯 {selectedGoal.title}
            </span>
          </>
        )}
      </div>

      {/* Mobile Stacked 3-Step Drill-down Layout (< 1024px) */}
      <div className="lg:hidden space-y-4">
        {mobileStep === 'areas' && (
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Layers}
              title="Life Areas"
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsAreaModalOpen(true)}>
                  Add
                </Button>
              }
            />
            <div className="space-y-2.5">
              {lifeAreas.length === 0 ? (
                <div className="p-4 text-center bg-slate-50/60 border border-dashed border-slate-200 rounded-xl space-y-1">
                  <p className="text-xs font-semibold text-[#0F172A]">No Life Areas yet</p>
                  <p className="text-[11px] text-[#64748B]">Click "+ Add" to create your first Life Area.</p>
                </div>
              ) : (
                lifeAreas.map((la) => (
                  <LifeAreaCard
                    key={la.id}
                    lifeArea={la}
                    isSelected={la.id === selectedLifeAreaId}
                    onSelect={handleSelectAreaMobile}
                    onRename={(id, newName) => updateLifeArea(id, { name: newName })}
                    onDelete={deleteLifeArea}
                    goalCount={goals.filter((g) => g.lifeAreaId === la.id).length}
                  />
                ))
              )}
            </div>
          </Card>
        )}

        {mobileStep === 'goals' && (
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Target}
              title={selectedLifeArea ? `${selectedLifeArea.name} Goals` : 'Goals'}
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsGoalModalOpen(true)}>
                  Add Goal
                </Button>
              }
            />
            {!selectedLifeArea ? (
              <p className="text-xs text-slate-400 p-4 text-center">Create a Life Area first.</p>
            ) : filteredGoals.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 text-center">No goals in this Life Area.</p>
            ) : (
              <div className="space-y-2.5">
                {filteredGoals.map((g) => (
                  <GoalCard
                    key={g.id}
                    goal={g}
                    isSelected={g.id === selectedGoalId}
                    onSelect={handleSelectGoalMobile}
                    onUpdate={updateGoal}
                    onDelete={deleteGoal}
                    onToggleArchive={toggleArchiveGoal}
                    templateCount={templates.filter((t) => t.goalId === g.id).length}
                  />
                ))}
              </div>
            )}
          </Card>
        )}

        {mobileStep === 'templates' && (
          <Card hoverEffect={false} className="p-4 space-y-3">
            <SectionHeader
              icon={Calendar}
              title={selectedGoal ? `${selectedGoal.title} Templates` : 'Task Templates'}
              rightAction={
                <Button variant="ghost" size="sm" icon={Plus} onClick={() => setIsTemplateModalOpen(true)}>
                  Add Template
                </Button>
              }
            />
            {!selectedGoal ? (
              <p className="text-xs text-slate-400 p-4 text-center">Select or create a Goal first.</p>
            ) : filteredTemplates.length === 0 ? (
              <p className="text-xs text-slate-400 p-4 text-center">No task templates for this goal.</p>
            ) : (
              <div className="space-y-2.5">
                {filteredTemplates.map((t) => (
                  <TemplateRow
                    key={t.id}
                    template={t}
                    onUpdate={updateTemplate}
                    onToggleActive={toggleActiveTemplate}
                    onDelete={deleteTemplate}
                  />
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Creation Modals */}
      <CreateLifeAreaModal
        isOpen={isAreaModalOpen}
        onClose={() => setIsAreaModalOpen(false)}
        onCreate={handleCreateAreaSubmitted}
      />

      <CreateGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onCreate={handleCreateGoalSubmitted}
        lifeAreas={lifeAreas}
        defaultLifeAreaId={selectedLifeAreaId}
      />

      <CreateTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onCreate={handleCreateTemplateSubmitted}
        goals={filteredGoals.length > 0 ? filteredGoals : goals}
        defaultGoalId={selectedGoalId}
      />
    </PageContainer>
  );
};
