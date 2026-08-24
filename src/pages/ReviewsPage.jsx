import { PageContainer } from '../components/ui/PageContainer';
import { useReviews } from '../hooks/useReviews';
import { ReviewHeader } from '../features/reviews/components/ReviewHeader';
import { ReviewScore } from '../features/reviews/components/ReviewScore';
import { ReviewMetricGrid } from '../features/reviews/components/ReviewMetricGrid';
import { ReviewHighlights } from '../features/reviews/components/ReviewHighlights';
import { AttentionList } from '../features/reviews/components/AttentionList';
import { WeeklyDayStrip } from '../features/reviews/components/WeeklyDayStrip';
import { PeriodComparison } from '../features/reviews/components/PeriodComparison';
import { LifeAreaReview } from '../features/reviews/components/LifeAreaReview';
import { ReviewReflection } from '../features/reviews/components/ReviewReflection';
import { ReviewEmptyState } from '../features/reviews/components/ReviewEmptyState';

export const ReviewsPage = () => {
  const {
    reviewType,
    setReviewType,
    periodLabel,
    navigatePrevious,
    navigateNext,
    resetToCurrent,
    review,
  } = useReviews();

  return (
    <PageContainer>
      {/* Header, Type Selector & Period Navigator */}
      <ReviewHeader
        reviewType={reviewType}
        onSelectType={setReviewType}
        periodLabel={periodLabel}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        onToday={resetToCurrent}
      />

      {/* Check Has Data */}
      {!review || !review.hasData ? (
        <ReviewEmptyState reviewType={reviewType} />
      ) : (
        <div className="space-y-6">
          {/* Review Score & Rating Label */}
          <ReviewScore score={review.score} label={review.label} />

          {/* Metric Breakdown Grid */}
          <ReviewMetricGrid
            metrics={review.metrics}
            strongestLifeArea={review.strongestLifeArea}
            weakestLifeArea={review.weakestLifeArea}
          />

          {/* Weekly Performance Strip (Weekly Review Only) */}
          {reviewType === 'weekly' && review.dayScores && (
            <WeeklyDayStrip dayScores={review.dayScores} />
          )}

          {/* Period Comparisons (Weekly & Monthly Reviews) */}
          {review.comparisons && (
            <PeriodComparison comparisons={review.comparisons} />
          )}

          {/* Monthly Life Area Breakdown (Monthly Review Only) */}
          {reviewType === 'monthly' && review.lifeAreaPerformance && (
            <LifeAreaReview lifeAreas={review.lifeAreaPerformance} />
          )}

          {/* Highlights & Attention Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ReviewHighlights highlights={review.highlights} />
            <AttentionList attentionItems={review.attentionItems} />
          </div>

          {/* Journal Reflection Entry / Summary */}
          <ReviewReflection
            reflection={review.reflection}
            reflectionsSummary={review.reflectionsSummary}
            reviewType={reviewType}
          />
        </div>
      )}
    </PageContainer>
  );
};
